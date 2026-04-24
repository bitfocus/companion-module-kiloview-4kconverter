module.exports = {
	initActions: function () {
		let self = this
		let actions = {}

		actions.modeSwitch = {
			name: 'Set Mode',
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'mode',
					default: self.CHOICES_CONVERTER_MODES[0].id,
					choices: self.CHOICES_CONVERTER_MODES,
				},
			],
			callback: async function (action) {
				let options = action.options
				await self.DEVICE.modeSet(options.mode)
			},
		}

		actions.toggleMode = {
			name: 'Toggle Mode',
			callback: async function (action) {
				if (self.STATE.mode && self.STATE.mode === 'encode') {
					await self.DEVICE.modeSet('decode')
				} else {
					await self.DEVICE.modeSet('encode')
				}
			},
		}

		actions.refreshStatus = {
			name: 'Refresh Device Status',
			callback: async function (action) {
				await self.checkState()
			},
		}

		actions.reboot = {
			name: 'Reboot Device',
			callback: async function (action) {
				await self.DEVICE.reboot()
			},
		}


		if (self.STATE.mode === 'encode') {
			actions.chooseEncodeMode = {
				name: 'Choose Encode Mode',
				options: [
					{
						type: 'dropdown',
						label: 'Encode Mode',
						id: 'mode',
						default: self.CHOICES_ENCODE_MODES[0].id,
						choices: self.CHOICES_ENCODE_MODES,
					},
				],
				callback: async function (action) {
					let options = action.options
					await self.DEVICE.chooseEncode(options.mode)
				},
			}

			actions.setFullYUVMode = {
				name: 'Set NDI FULL Color Format',
				options: [
					{
						type: 'dropdown',
						label: 'NDI FULL Color Format',
						id: 'full_yuv_mode',
						default: self.CHOICES_ENCODE_YUV_MODES[0].id,
						choices: self.CHOICES_ENCODE_YUV_MODES,
					},
				],
				callback: async function (action) {
					let options = action.options
					await self.DEVICE.setEncoderParams('main_full', {yuv: options.full_yuv_mode})
				},
			}

			actions.setFullBitdepthMode = {
				name: 'Set NDI FULL Color Depth',
				options: [
					{
						type: 'dropdown',
						label: 'NDI FULL Color Depth',
						id: 'full_bitdepth_mode',
						default: self.CHOICES_ENCODE_BITDEPTH_MODES[0].id,
						choices: self.CHOICES_ENCODE_BITDEPTH_MODES,
					},
				],
				callback: async function (action) {
					let options = action.options
					await self.DEVICE.setEncoderParams('main_full', {color_depth: options.full_bitdepth_mode})
				},
			}
			
			actions.setHxYUVMode = {
				name: 'Set NDI HX Color Format',
				options: [
					{
						type: 'dropdown',
						label: 'NDI HX Color Format',
						id: 'hx_yuv_mode',
						default: self.CHOICES_ENCODE_YUV_MODES[0].id,
						choices: self.CHOICES_ENCODE_YUV_MODES,
					},
				],
				callback: async function (action) {
					let options = action.options
					await self.DEVICE.setEncoderParams('main', {yuv: options.hx_yuv_mode})
				},
			}

			actions.setHxBitdepthMode = {
				name: 'Set NDI HX Color Depth',
				options: [
					{
						type: 'dropdown',
						label: 'NDI HX Color Depth',
						id: 'hx_bitdepth_mode',
						default: self.CHOICES_ENCODE_BITDEPTH_MODES[0].id,
						choices: self.CHOICES_ENCODE_BITDEPTH_MODES,
					},
				],
				callback: async function (action) {
					let options = action.options
					await self.DEVICE.setEncoderParams('main', {color_depth: options.hx_bitdepth_mode})
				},
			}

			actions.setHxH26xCodec = {
				name: 'Set NDI HX Codec',
				options: [
					{
						type: 'dropdown',
						label: 'H26x Codec',
						id: 'hx_h26x_codec',
						default: self.CHOICES_ENCODE_H26x_CODECS[0].id,
						choices: self.CHOICES_ENCODE_H26x_CODECS,
					},
				],
				callback: async function (action) {
					let options = action.options
					await self.DEVICE.setEncoderParams('main', {mode_version: options.hx_h26x_codec})
				},
			}

			
			actions.setNetYUVMode = {
				name: 'Set Net Stream Color Format',
				options: [
					{
						type: 'dropdown',
						label: 'Net Stream Color Format',
						id: 'net_yuv_mode',
						default: self.CHOICES_ENCODE_YUV_MODES[1].id,
						choices: self.CHOICES_ENCODE_YUV_MODES,
					},
				],
				callback: async function (action) {
					let options = action.options
					let params = await self.DEVICE.getEncoderParams('multi_protocol')
					
					params.color_sampling = options.net_yuv_mode
					if(options.net_yuv_mode === self.CHOICES_ENCODE_YUV_MODES[1].id){//4:2:0
						if(params.color_depth === 0){//8bit
							params.yuv = "NV12"
						}else{//10bit
							params.yuv = "NV12_10LE32"
						}
					}else{//4:2:2
						if(params.color_depth === 0){//8bit
							params.yuv = "NV16"
						}else{//10bit
							params.yuv = "NV16_10LE32"
						}
					}
					params.yuv_mode = 2
					params.mode = 2

					await self.DEVICE.setEncoderMultiProtocolParams(params)
				},
			}

			actions.setNetBitdepthMode = {
				name: 'Set Net Stream Color Depth',
				options: [
					{
						type: 'dropdown',
						label: 'Net Stream Color Depth',
						id: 'net_bitdepth_mode',
						default: self.CHOICES_ENCODE_BITDEPTH_MODES[0].id,
						choices: self.CHOICES_ENCODE_BITDEPTH_MODES,
					},
				],
				callback: async function (action) {
					let options = action.options
					let params = await self.DEVICE.getEncoderParams('multi_protocol')
					params.color_depth = options.net_bitdepth_mode
					if(params.color_sampling === self.CHOICES_ENCODE_YUV_MODES[1].id){//4:2:0
						if(params.color_depth === 0){//8bit
							params.yuv = "NV12"
						}else{//10bit
							params.yuv = "NV12_10LE32"
						}
					}else{//4:2:2
						if(params.color_depth === 0){//8bit
							params.yuv = "NV16"
						}else{//10bit
							params.yuv = "NV16_10LE32"
						}
					}
					params.yuv_mode = 2
					params.mode = 2

					await self.DEVICE.setEncoderMultiProtocolParams(params)
				},
			}

			actions.setNetH26xCodec = {
				name: 'Set Net Stream Codec',
				options: [
					{
						type: 'dropdown',
						label: 'H26x Codec',
						id: 'net_h26x_codec',
						default: self.CHOICES_ENCODE_H26x_CODECS[0].id,
						choices: self.CHOICES_ENCODE_H26x_CODECS,
					},
				],
				callback: async function (action) {
					let options = action.options
					let params = await self.DEVICE.getEncoderParams('multi_protocol')
					params.mode_version = options.net_h26x_codec
					params.mode = 2

					await self.DEVICE.setEncoderMultiProtocolParams(params)
				},
			}

			actions.setNDIParams = {
				name: 'Set NDI Parameters',
				options: [
					{
						type: 'dropdown',
						label: 'Encoder Stream',
						id: 'stream',
						default: self.CHOICES_ENCODER_STREAMS[0].id,
						choices: self.CHOICES_ENCODER_STREAMS,
					},
					{
						type: 'textinput',
						label: 'NDI Group',
						id: 'group',
						default: '',
					},
					{
						type: 'textinput',
						label: 'NDI Channel Name',
						id: 'channel',
						default: '',
					},
					{
						type: 'dropdown',
						label: 'Connection Type',
						id: 'connection',
						default: self.CHOICES_NDI_CONNECTION[0].id,
						choices: self.CHOICES_NDI_CONNECTION,
					},
				],
				callback: async function (action) {
					let options = action.options
					let params = {}
					if (options.group) params.group = options.group
					if (options.channel) params.channel_name = options.channel
					if (options.connection) params.connection = options.connection
					await self.DEVICE.setStreamParams(options.stream, 'ndi', params)
				},
			}

			actions.setAudioParams = {
				name: 'Set Audio Parameters',
				options: [
					{
						type: 'dropdown',
						label: 'Encoder Stream',
						id: 'stream',
						default: self.CHOICES_ENCODER_STREAMS[0].id,
						choices: self.CHOICES_ENCODER_STREAMS,
					},
					{
						type: 'dropdown',
						label: 'Audio Source',
						id: 'source',
						default: self.CHOICES_AUDIO_SOURCE[0].id,
						choices: self.CHOICES_AUDIO_SOURCE,
					},
					{
						type: 'number',
						label: 'Volume (0-200)',
						id: 'volume',
						min: 0,
						max: 200,
						default: 100,
					},
				],
				callback: async function (action) {
					let options = action.options
					let params = {
						stream: options.stream,
						audio_source: options.source,
						volume: options.volume,
					}
					await self.DEVICE.setAudio(params)
				},
			}

			actions.setNetStreamParams = {
				name: 'Set Net Stream Parameters',
				options: [
					{
						type: 'dropdown',
						label: 'Protocol',
						id: 'protocol',
						default: self.CHOICES_NET_STREAM_PROTOCOL[0].id,
						choices: self.CHOICES_NET_STREAM_PROTOCOL,
					},
					{
						type: 'checkbox',
						label: 'Enable',
						id: 'enable',
						default: true,
					},
					/*{
						type: 'textinput',
						label: 'Address',
						id: 'address',
						default: '',
					},*/
				],
				callback: async function (action) {
					let options = action.options
					let params = {
						stream_enable: options.enable,
						stream_name: options.protocol,
					}
					//if (options.address) params.address = options.address
					let address = ''
					let address_check_ok = false
					if(options.protocol === 'udp'){
						address = self.STATE.info?.data?.multi_protocol_streams?.udp?.address || ''
						if(address && address.length > 0){
							address_check_ok = true
						}
					}else if(options.protocol === 'rtp'){
						address = self.STATE.info?.data?.multi_protocol_streams?.rtp?.address || ''
						if(address && address.length > 0){
							address_check_ok = true
						}
						params.stream_name = 'ts'
					}else if(options.protocol === 'rtmp'){
						address = self.STATE.info?.data?.multi_protocol_streams?.rtmp?.address || ''
						if(address && address.length > 7){
							address_check_ok = true
						}
					}else if(options.protocol === 'hls'){
						address = self.STATE.info?.data?.multi_protocol_streams?.hls?.media_playlist_url || ''
						if(address && address.length > 0){
							address_check_ok = true
						}						
					}else if(options.protocol === 'rtsp'){
						address = self.STATE.info?.data?.multi_protocol_streams?.rtsp?.session || ''						
						if(address && address.length > 0){
							address_check_ok = true
						}
						multicast_addr = self.STATE.info?.data?.multi_protocol_streams?.rtsp?.multicast_address || ''
						if(self.STATE.info?.data?.multi_protocol_streams?.rtsp?.multicast_enable === true &&
							multicast_addr && multicast_addr.length > 0){
							address_check_ok = true
						}
					}

					if(!address_check_ok){
						console.log('ERROR: ' + options.protocol + ' Config is invalid, please open the device web interface to check the config')
						return
					}

					await self.DEVICE.setMultiProtocolEnableStream(params)
				},
			}
		} else {
			actions.setPreset = {
				name: 'Set Preset',
				options: [
					{
						type: 'dropdown',
						label: 'Preset',
						id: 'preset',
						default: self.CHOICES_PRESETS[0].id,
						choices: self.CHOICES_PRESETS,
					},
				],
				callback: async function (action) {
					let options = action.options
					await self.DEVICE.decodeAdd(parseInt(options.preset))
				},
			}

			actions.setSource = {
				name: 'Select NDI Source',
				options: [
					{
						type: 'dropdown',
						label: 'Source',
						id: 'url',
						default: self.CHOICES_SOURCES[0].id,
						choices: self.CHOICES_SOURCES,
					},
				],
				callback: async function (action) {
					let options = action.options
					let [name, url] = Buffer.from(options.url, 'base64').toString().split(/:/)
					await self.DEVICE.decodeAddSpec(name, url)
				},
			}

			actions.refreshSources = {
				name: 'Refresh NDI Sources',
				callback: async function (action) {
					await self.checkSources()
				},
			}

			actions.setBlank = {
				name: 'Output with Blank',
				callback: async function (action) {
					await self.DEVICE.decodeAdd(0)
					await self.checkSources()
				},
			}	

			actions.setOutputResolution = {
				name: 'Set Output Resolution',
				options: [
					{
						type: 'dropdown',
						label: 'Resolution',
						id: 'resolution',
						default: self.CHOICES_RESOLUTION[0].id,
						choices: self.CHOICES_RESOLUTION,
					},
				],
				callback: async function (action) {
					let options = action.options
					await self.DEVICE.setOutputResolution(self.STATE.output_settings,options.resolution)
				},
			}

			actions.setOutputFrameRate = {
				name: 'Set Output Frame Rate',
				options: [
					{
						type: 'dropdown',
						label: 'Frame Rate',
						id: 'frame_rate',
						default: self.CHOICES_FRAME_RATE[0].id,
						choices: self.CHOICES_FRAME_RATE,
					},
				],
				callback: async function (action) {
					let options = action.options
					await self.DEVICE.setOutputFrameRate(self.STATE.output_settings, options.frame_rate)
				},
			}



			actions.addNDIPreset = {
				name: 'Add NDI Preset',
				options: [
					{
						type: 'number',
						label: 'Preset ID (1-9)',
						id: 'id',
						min: 1,
						max: 9,
						default: 1,
					},
					{
						type: 'textinput',
						label: 'Name',
						id: 'name',
						default: '',
					},
					{
						type: 'textinput',
						label: 'Group',
						id: 'group',
						default: '',
					},
					{
						type: 'textinput',
						label: 'Channel Name',
						id: 'channel',
						default: '',
					},
				],
				callback: async function (action) {
					let options = action.options
					let params = {
						id: options.id,
						name: options.name,
						group: options.group,
						channel_name: options.channel,
					}
					await self.DEVICE.addPreset(params)
				},
			}

			actions.addNetStreamPreset = {
				name: 'Add Net Stream Preset',
				options: [
					{
						type: 'number',
						label: 'Preset ID (1-9)',
						id: 'id',
						min: 1,
						max: 9,
						default: 1,
					},
					{
						type: 'textinput',
						label: 'Name',
						id: 'name',
						default: '',
					},
					{
						type: 'dropdown',
						label: 'Protocol',
						id: 'protocol',
						default: self.CHOICES_NET_STREAM_PROTOCOL[0].id,
						choices: self.CHOICES_NET_STREAM_PROTOCOL,
					},
					{
						type: 'textinput',
						label: 'URL',
						id: 'url',
						default: '',
					},
				],
				callback: async function (action) {
					let options = action.options
					let params = {
						id: options.id,
						name: options.name,
						protocol: options.protocol,
						url: options.url,
					}
					await self.DEVICE.addNetStreamPreset(params)
				},
			}

			actions.removePreset = {
				name: 'Remove Preset',
				options: [
					{
						type: 'number',
						label: 'Preset ID (1-9)',
						id: 'id',
						min: 1,
						max: 9,
						default: 1,
					},
				],
				callback: async function (action) {
					let options = action.options
					await self.DEVICE.removePreset(options.id)
				},
			}

			actions.setBlankColor = {
				name: 'Set Blank Color',
				options: [
					{
						type: 'textinput',
						label: 'Color (Hex, e.g., #000000)',
						id: 'color',
						default: '#000000',
					},
				],
				callback: async function (action) {
					let options = action.options
					await self.DEVICE.setBlankColor(options.color)
				},
			}

			actions.setDiscoveryServer = {
				name: 'Set Discovery Server',
				options: [
					{
						type: 'textinput',
						label: 'Server Address',
						id: 'server',
						default: '',
					},
				],
				callback: async function (action) {
					let options = action.options
					await self.DEVICE.setDiscoveryServer(options.server)
				},
			}

			actions.setDiscoveryGroupChannel = {
				name: 'Set Discovery Group/Channel',
				options: [
					{
						type: 'textinput',
						label: 'Group',
						id: 'group',
						default: '',
					},
					{
						type: 'textinput',
						label: 'Channel',
						id: 'channel',
						default: '',
					},
				],
				callback: async function (action) {
					let options = action.options
					await self.DEVICE.setDiscoveryGroupChannel(options.group, options.channel)
				},
			}

			actions.addManualNDISource = {
				name: 'Add Manual NDI Source',
				options: [
					{
						type: 'textinput',
						label: 'Name',
						id: 'name',
						default: '',
					},
					{
						type: 'textinput',
						label: 'IP Addresses (comma separated)',
						id: 'ips',
						default: '',
					},
				],
				callback: async function (action) {
					let options = action.options
					let ips = options.ips.split(',').map((ip) => ip.trim())
					await self.DEVICE.addManualIpsGroups(options.name, ips)
				},
			}
		}

		self.setActionDefinitions(actions)
	},
}
