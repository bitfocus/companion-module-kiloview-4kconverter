const { InstanceStatus } = require('@companion-module/base')

const kiloviewNDI = require('./kiloview')

module.exports = {
	async initConnection() {
		let self = this

		clearInterval(self.INTERVAL)
		clearInterval(self.INTERVAL_SOURCES)
		clearTimeout(self.RECONNECT_INTERVAL)

		if (self.config.host && self.config.host !== '') {
			self.updateStatus(InstanceStatus.Connecting)
			self.log('info', `Opening connection to ${self.config.host}`)
			self.STATE.mode = self.config.mode

			self.DEVICE = new kiloviewNDI(
				self.config.host,
				self.config.username,
				self.config.password,
				self.config.protocol,
				self.config.port
			)

			let authorized = false

			if (self.config.useAuth === false) {
				self.log('info', 'No authentication required. Connecting to device...')
				authorized = true
			} else {
				try {
					self.log('info', 'Attempting to authorize...')
					authorized = await self.DEVICE.authorize()
				} catch (error) {
					if (error.name === 'KiloviewNDIError') {
						self.log('error', 'Authorization failed. Check your username and password and try again.')
						self.updateStatus(InstanceStatus.ConnectionFailure, 'Authorization Failed. See log.')
					} else {
						self.log('error', 'Could not reach device. Retrying in 30 seconds.')
						self.updateStatus(InstanceStatus.ConnectionFailure)
						self.startReconnectInterval()
					}
					return
				}
			}

			if (authorized === true) {
				self.updateStatus(InstanceStatus.Ok)
				self.alias = self.DEVICE.alias
				self.log('info', `Connected to Device with user: ${self.alias}`)

				self.initActions()
				self.initFeedbacks()
				self.initVariables()
				self.initPresets()

				await new Promise((resolve) => setTimeout(resolve, 3000))

				await self.checkState()
				self.startInterval()
				self.startNDISourcesInterval()
			} else {
				self.log('error', 'Authorization failed. Check your username and password and try again.')
				self.updateStatus(InstanceStatus.ConnectionFailure, 'Authorization Failed. See log.')
			}
		}
	},

	startReconnectInterval: function () {
		let self = this

		self.updateStatus(InstanceStatus.ConnectionFailure, 'Reconnecting')

		if (self.RECONNECT_INTERVAL !== undefined) {
			clearTimeout(self.RECONNECT_INTERVAL)
			self.RECONNECT_INTERVAL = undefined
		}

		self.log('info', 'Attempting to reconnect in 30 seconds...')

		self.RECONNECT_INTERVAL = setTimeout(self.initConnection.bind(this), 30000)
	},

	startInterval: function () {
		let self = this

		if (self.config.polling) {
			if (self.config.pollingrate === undefined || self.config.pollingrate < 1000) {
				self.config.pollingrate = 1000
			}

			self.log(
				'info',
				`Starting Update Interval: Fetching new data from Device every ${self.config.pollingrate}ms.`
			)
			self.INTERVAL = setInterval(self.checkState.bind(self), parseInt(self.config.pollingrate))
		} else {
			self.log(
				'info',
				'Polling is disabled. Module will not request new data at a regular rate. Feedbacks and Variables will not update.'
			)
		}
	},

	async startNDISourcesInterval() {
		let self = this

		if (self.config.polling && self.STATE.mode === 'decode') {
			if (self.config.pollingrate_sources === undefined || self.config.pollingrate_sources < 1000) {
				self.config.pollingrate_sources = 10000
			}

			self.INTERVAL_SOURCES = setInterval(self.checkSources.bind(self), parseInt(self.config.pollingrate_sources))
		} else {
			self.log('info', 'Polling is disabled or not in decoder mode. Module will not request new NDI sources at a regular rate.')
		}
	},

	async checkState() {
		let self = this

		if (!self.DEVICE) {
			return
		}

		try {
			const mode = await self.DEVICE.modeGet()
			if (mode.data.mode === 'encode' || mode.data.mode === 'decode') {
				if (self.STATE.mode !== mode.data.mode) {
					self.STATE.mode = mode.data.mode
					self.initActions()
					self.initFeedbacks()
					self.initVariables()
					self.initPresets()
				}
				self.updateStatus(InstanceStatus.Ok)
			}
		} catch (e) {
			self.log('error', 'Error getting mode: ' + e.message)
			self.updateStatus(InstanceStatus.ConnectionFailure)
			self.startReconnectInterval()
			return
		}

		try {
			const hostname = await self.DEVICE.getHostname()
			self.STATE.hostname = hostname.data.hostname || ''
		} catch (e) {
			if (self.config.verbose) {
				self.log('debug', 'Error getting hostname: ' + e.message)
			}
		}

		try {
			const server_info = await self.DEVICE.getSystemInfo()
			self.STATE.server_info = server_info
			self.STATE.product = server_info?.data?.version?.product || ''
			self.STATE.serial_number = server_info?.data?.version?.serialNumber || ''
			self.STATE.firmware_version = server_info?.data?.version?.softwareVersion || ''
		} catch (e) {
			if (self.config.verbose) {
				self.log('debug', 'Error getting server info: ' + e.message)
			}
		}

		try {
			if (self.STATE.mode === 'decode') {
				const info = await self.DEVICE.decodeGet()				
				self.STATE.info = info
				self.STATE.output_settings = self.DEVICE.getOutputSettings(info)
				if(self.STATE.product === 'N50' || self.STATE.product === 'FN50'){
					self.STATE.output_settings.videoSource = 'sdi'
				}
				if(self.STATE.product === 'N60' || self.STATE.product === 'FN60'){
					self.STATE.output_settings.videoSource = 'hdmi'
				}


				const presets = await self.DEVICE.getPreset()
				if (JSON.stringify(self.STATE.presets) !== JSON.stringify(presets)) {
					self.log('info', 'NDI Presets have changed. Updating Presets...')
					self.STATE.presets = presets
					self.initActions()
					self.initFeedbacks()
					self.initVariables()
					self.initPresets()
				}
			} else if (self.STATE.mode === 'encode') {
				const encodeMode = await self.DEVICE.getEncode()
				console.log("encodeMode:", encodeMode)

				self.STATE.encode_mode = encodeMode?.data?.encode_mode || 'N/A'

				const mainInfo = await self.DEVICE.getEncoderParams('main')
				const mainFullInfo = await self.DEVICE.getEncoderParams('main_full')
				const multiProtocolInfo = await self.DEVICE.getEncoderParams('multi_protocol')

				const streamMainInfo = await self.DEVICE.getStreamParams('main', 'ndi-hx')
				const streamFullInfo = await self.DEVICE.getStreamParams('main_full', 'ndi-full')
				const bitrates = await self.DEVICE.getEncodeBitrates()
				//console.log("bitrates:", bitrates?.data)

				const signal = await self.DEVICE.getEncodeSignal()
				//console.log("signal:", signal?.data?.signal)
				self.STATE.info = {
					data: {
						main: mainInfo,
						main_stream: streamMainInfo,
						main_full: mainFullInfo,
						main_full_stream: streamFullInfo,
						multi_protocol: multiProtocolInfo,
						bitrates: bitrates?.data,
						signal: signal?.data?.signal,
					},
				}

				if(mainFullInfo?.yuv_mode === 0){
					self.STATE.full_yuv_mode = 'auto'
				}
				else{
					self.STATE.full_yuv_mode = mainFullInfo?.color_sampling
				}
				
				self.STATE.full_bitdepth_mode = mainFullInfo?.color_depth

				if(mainInfo?.yuv_mode === 0){
					self.STATE.hx_yuv_mode = 'auto'
				}
				else{
					self.STATE.hx_yuv_mode = mainInfo?.color_sampling
				}
				self.STATE.hx_bitdepth_mode = mainInfo?.color_depth
				self.STATE.hx_h26x_codec = mainInfo?.mode_version || 'N/A'
	


				self.STATE.net_yuv_mode = multiProtocolInfo?.color_sampling
				
				self.STATE.net_bitdepth_mode = multiProtocolInfo?.color_depth
				self.STATE.net_h26x_codec = multiProtocolInfo?.mode_version || 'N/A'



				if(self.STATE.encode_mode.indexOf('net') !== -1){
					const srt = await self.DEVICE.getMultiProtocolStream('srt')
					const udp = await self.DEVICE.getMultiProtocolStream('ts')
					const rtp = await self.DEVICE.getMultiProtocolStream('rtp')
					const rtmp = await self.DEVICE.getMultiProtocolStream('rtmp')
					const hls = await self.DEVICE.getMultiProtocolStream('hls')
					const rtsp = await self.DEVICE.getMultiProtocolStream('rtsp')
					self.STATE.info.data.multi_protocol_streams = {
						srt: srt?.data,
						udp: udp?.data,
						rtp: rtp?.data,
						rtmp: rtmp?.data,
						hls: hls?.data,
						rtsp: rtsp?.data,
					}
				}
			}
		} catch (e) {
			if (self.config.verbose) {
				self.log('debug', 'Error getting info: ' + e.message)
			}
		}

		self.checkFeedbacks()
		self.checkVariables()
	},

	async checkSources() {
		let self = this

		if (!self.DEVICE || self.STATE.mode !== 'decode') {
			return
		}

		let sourcesArray = []

		try {
			const presets = await self.DEVICE.getPreset()

			if (presets && presets.data instanceof Array) {
				presets.data.forEach((preset) => {
					if (preset.enable && preset.url) {
						sourcesArray.push({
							id: Buffer.from(preset.name + ':' + preset.url).toString('base64'),
							label: preset.name,
						})
					}
				})
			}

			if (sourcesArray.length === 0) {
				sourcesArray = [{ id: 'null', url: '', label: '- No sources available -' }]
			}
		} catch (e) {
			self.log('error', 'Error getting sources: ' + e.message)
			sourcesArray = [{ id: 'null', url: '', label: '- No sources available -' }]
		}

		if (JSON.stringify(self.CHOICES_SOURCES) !== JSON.stringify(sourcesArray)) {
			self.log('info', 'NDI Sources have changed. Updating Choices.')
			self.CHOICES_SOURCES = sourcesArray
			self.initActions()
			self.initFeedbacks()
			self.initVariables()
			self.initPresets()
		}
	},
}
