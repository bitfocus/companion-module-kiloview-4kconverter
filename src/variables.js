function formatUptime(uptime) {
	if (!uptime || isNaN(uptime)) {
		return ''
	}
	
	const totalSeconds = Math.floor(uptime)
	const days = Math.floor(totalSeconds / 86400)
	const remainingSeconds = totalSeconds % 86400
	const hours = Math.floor(remainingSeconds / 3600)
	const minutes = Math.floor((remainingSeconds % 3600) / 60)
	const seconds = remainingSeconds % 60
	
	const hoursStr = hours.toString().padStart(2, '0')
	const minutesStr = minutes.toString().padStart(2, '0')
	const secondsStr = seconds.toString().padStart(2, '0')
	if (days > 0) {
		return `${days} Days ${hoursStr}:${minutesStr}:${secondsStr}`
	}
	
	return `${hoursStr}:${minutesStr}:${secondsStr}`
}

module.exports = {
	initVariables() {
		let self = this
		let variables = []

		variables.push({ variableId: 'mode', name: 'Current Converter Mode' })
		variables.push({ variableId: 'alias', name: 'Authorized User' })
		variables.push({ variableId: 'hostname', name: 'Device Hostname' })
		variables.push({ variableId: 'product', name: 'Product Type' })
		variables.push({ variableId: 'serial_number', name: 'Device Serial Number' })
		variables.push({ variableId: 'fireware_version', name: 'Fireware Version' })

		variables.push({ variableId: 'resolution', name: 'Resolution' })
		variables.push({ variableId: 'audio_format', name: 'Audio Format' })

		if (self.STATE.mode === 'encode') {
			variables.push({ variableId: 'encode_mode', name: 'Current Encode Mode' })
			variables.push({ variableId: 'full_yuv_mode', name: 'Current NDI FULL Color Format' })
			variables.push({ variableId: 'full_bitdepth_mode', name: 'Current NDI FULL Color Depth' })

			variables.push({ variableId: 'hx_yuv_mode', name: 'Current NDI HX Color Format' })
			variables.push({ variableId: 'hx_bitdepth_mode', name: 'Current NDI HX Bit Depth' })
			variables.push({ variableId: 'hx_h26x_codec', name: 'Current NDI HX Codec' })
	
			variables.push({ variableId: 'net_yuv_mode', name: 'Current Net Stream Color Format' })
			variables.push({ variableId: 'net_bitdepth_mode', name: 'Current Net Stream Color Depth' })
			variables.push({ variableId: 'net_h26x_codec', name: 'Current Net Stream Codec' })
			
			variables.push({ variableId: 'video_signal', name: 'Video Signal Present' })
			variables.push({ variableId: 'audio_signal', name: 'Audio Signal Present' })
			variables.push({ variableId: 'bitrate', name: 'NDI Bitrate' })
			variables.push({ variableId: 'gop_length', name: 'GOP Length' })
			variables.push({ variableId: 'profile', name: 'Profile' })

			variables.push({ variableId: 'hb_started', name: 'NDI HB Stream Started' })
			variables.push({ variableId: 'hb_group', name: 'NDI HB Group' })
			variables.push({ variableId: 'hb_channel', name: 'NDI HB Channel' })
			variables.push({ variableId: 'hb_connection', name: 'NDI HB Connection' })

			variables.push({ variableId: 'hx_started', name: 'NDI HX Stream Started' })
			variables.push({ variableId: 'hx_group', name: 'NDI HX Group' })
			variables.push({ variableId: 'hx_channel', name: 'NDI HX Channel' })
			variables.push({ variableId: 'hx_connection', name: 'NDI HX Connection' })

			variables.push({ variableId: 'net_started', name: 'Net Stream Started' })
			variables.push({ variableId: 'net_protocol', name: 'Net Stream Protocol' })
			variables.push({ variableId: 'net_address', name: 'Net Stream Address' })

			variables.push({ variableId: 'hb_bitrate', name: 'NDI HB Stream Bitrate' })
			variables.push({ variableId: 'hx_bitrate', name: 'NDI HX Stream Bitrate' })
			variables.push({ variableId: 'net_bitrate', name: 'Net Stream Bitrate' })

		} else {
			variables.push({ variableId: 'codec', name: 'NDI Codec' })
			variables.push({ variableId: 'streamname', name: 'NDI Stream Name' })
			variables.push({ variableId: 'online_state', name: 'NDI Source Online' })
			variables.push({ variableId: 'current_preset', name: 'Current Preset ID' })
			variables.push({ variableId: 'color_sampling', name: 'Sampling'})
			variables.push({ variableId: 'bitrate', name: 'Bitrate'})
			variables.push({ variableId: 'resolution', name: 'Resolution'})
			variables.push({ variableId: 'color_depth', name: 'Color Depth'})
			variables.push({ variableId: 'aspect_ratio', name: 'Aspect Ratio'})
			variables.push({ variableId: 'url', name: 'URL'})
			variables.push({ variableId: 'ip', name: 'IP Address'})

			variables.push({ variableId: 'output_resolution', name: 'Output Resolution' })
			variables.push({ variableId: 'frame_rate', name: 'Frame Rate' })
			variables.push({ variableId: 'sample_rate', name: 'Sample Rate' })

			for (let i = 1; i <= 10; i++) {
				variables.push({ variableId: 'preset' + i + '_enabled', name: 'Preset ' + i + ' Enabled' })
				variables.push({ variableId: 'preset' + i + '_group', name: 'Preset ' + i + ' Group' })
				variables.push({ variableId: 'preset' + i + '_name', name: 'Preset ' + i + ' Name' })
				variables.push({ variableId: 'preset' + i + '_device_name', name: 'Preset ' + i + ' Device Name' })
				variables.push({ variableId: 'preset' + i + '_channel_name', name: 'Preset ' + i + ' Channel Name' })
				variables.push({ variableId: 'preset' + i + '_url', name: 'Preset ' + i + ' URL' })
				variables.push({ variableId: 'preset' + i + '_ip', name: 'Preset ' + i + ' IP' })
				variables.push({ variableId: 'preset' + i + '_online', name: 'Preset ' + i + ' Online' })
				variables.push({ variableId: 'preset' + i + '_current', name: 'Preset ' + i + ' Current' })
			}
		}

		//variables.push({ variableId: 'cpu_cores', name: 'CPU Cores' })
		variables.push({ variableId: 'cpu_payload', name: 'CPU Usage' })
		variables.push({ variableId: 'mem_used', name: 'Memory Used' })
		variables.push({ variableId: 'mem_total', name: 'Memory Total' })
		//variables.push({ variableId: 'start_time', name: 'Device Start Time' })
		variables.push({ variableId: 'uptime', name: 'Device Uptime' })

		self.setVariableDefinitions(variables)
	},

	checkVariables() {
		let self = this

		try {
			let variableObj = {}

			variableObj.mode = self.STATE.mode === 'encode' ? 'Encoder' : 'Decoder'
			variableObj.alias = self.alias || ''
			variableObj.hostname = self.STATE.hostname || ''
			variableObj.product = self.STATE.product || ''
			variableObj.serial_number = self.STATE.serial_number || ''
			variableObj.fireware_version = self.STATE.fireware_version || ''

		
			
			if (self.STATE.mode === 'encode') {
				variableObj.encode_mode = self.STATE.encode_mode || 'N/A'

				variableObj.full_yuv_mode = self.STATE.full_yuv_mode

				variableObj.full_bitdepth_mode = (self.STATE.full_bitdepth_mode == 0 ? '8bit' : '10bit')

				variableObj.hx_yuv_mode = self.STATE.hx_yuv_mode
				variableObj.hx_bitdepth_mode = (self.STATE.hx_bitdepth_mode == 0 ? '8bit' : '10bit')
				variableObj.hx_h26x_codec = (self.STATE.hx_h26x_codec == 1 ? 'H264' : 'H265')

				variableObj.net_yuv_mode = self.STATE.net_yuv_mode
				variableObj.net_bitdepth_mode = (self.STATE.net_bitdepth_mode == 0 ? '8bit' : '10bit')
				variableObj.net_h26x_codec = (self.STATE.net_h26x_codec == 1 ? 'H264' : 'H265')

				variableObj.video_signal = self.STATE.info?.data?.signal === 'none' ? 'False' : 'True'
				variableObj.audio_signal = variableObj.video_signal

				variableObj.bitrate = self.STATE.info?.data?.main?.target_bitrate || ''
				variableObj.gop_length = self.STATE.info?.data?.main?.gop_length || ''
				variableObj.profile = self.STATE.info?.data?.main?.profile || ''



				variableObj.hb_started = self.STATE.info?.data?.main_full?.started ? 'True' : 'False'
				variableObj.hb_group = self.STATE.info?.data?.main_full?.group || ''
				variableObj.hb_channel = self.STATE.info?.data?.main_full?.channel_name || ''
				variableObj.hb_connection = self.STATE.info?.data?.main_full?.connection || ''

				variableObj.hx_started = self.STATE.info?.data?.main?.started ? 'True' : 'False'
				variableObj.hx_group = self.STATE.info?.data?.main?.group || ''
				variableObj.hx_channel = self.STATE.info?.data?.main?.channel_name || ''
				variableObj.hx_connection = self.STATE.info?.data?.main?.connection || ''

				variableObj.net_started = self.STATE.info?.data?.multi_protocol?.started ? 'True' : 'False'
				variableObj.net_protocol = self.STATE.info?.data?.multi_protocol?.protocol || ''
				variableObj.net_address = self.STATE.info?.data?.multi_protocol?.address || ''
			
				let bitrate = self.STATE.info?.data?.bitrates?.ndi_hb?.bitrate
				if (bitrate !== undefined && bitrate !== null && bitrate !== '' && bitrate > 0) {
					bitrate = (bitrate / 1000).toFixed(2) + "Mbps"
				} else {
					bitrate = ''
				}
				variableObj.hb_bitrate = bitrate;

				bitrate = self.STATE.info?.data?.bitrates?.ndi_hx?.bitrate
				if (bitrate !== undefined && bitrate !== null && bitrate !== '' && bitrate > 0) {
					bitrate = (bitrate / 1000).toFixed(2) + "Mbps"
				} else {
					bitrate = ''
				}
				variableObj.hx_bitrate = bitrate;

				bitrate = self.STATE.info?.data?.bitrates?.multi_protocol?.bitrate
				if (bitrate !== undefined && bitrate !== null && bitrate !== '' && bitrate > 0) {
					bitrate = (bitrate / 1000).toFixed(2) + "Mbps"
				} else {
					bitrate = ''
				}
				variableObj.net_bitrate = bitrate;
			} else {
				variableObj.codec = self.STATE.info?.data?.codec || ''
				variableObj.streamname = self.STATE.info?.data?.name || ''
				variableObj.ip = self.STATE.info?.data?.ip || ''
				variableObj.url = self.STATE.info?.data?.url || ''

				variableObj.online_state = self.STATE.info?.data?.online ? 'True' : 'False'
				variableObj.current_preset = self.STATE.info?.data?.current_preset || ''

				variableObj.color_sampling = self.STATE.info?.data?.color_sampling || ''

				variableObj.aspect_ratio = self.STATE.info?.data?.aspect_ratio || ''
				variableObj.color_format = self.STATE.info?.data?.color_format || ''
				
				let bitrate = self.STATE.info?.data?.bitrate
				if (bitrate !== undefined && bitrate !== null && bitrate !== '' && bitrate > 0) {
					bitrate = (bitrate / 1000).toFixed(2) + "Mbps"
				} else {
					bitrate = ''
				}
				variableObj.bitrate = bitrate;
				

				let color_depth = self.STATE.info?.data?.color_depth
				if (color_depth !== undefined && color_depth !== null && color_depth !== '') {
					color_depth = String(color_depth)
					if (!color_depth.includes('bit')) {
						color_depth += 'bit'
					}
				} else {
					color_depth = ''
				}
				variableObj.color_depth = color_depth;
				variableObj.resolution = self.STATE.info?.data?.resolution || ''
				variableObj.output_resolution = self.STATE.info?.data?.output_resolution || ''
				variableObj.frame_rate = self.STATE.info?.data?.frame_rate || ''
				variableObj.sample_rate = self.STATE.info?.data?.sample_rate || ''
				variableObj.audio_format = self.STATE.info?.data?.audio || ''

				if (self.STATE.presets && self.STATE.presets.data) {
					for (let i = 1; i <= 10; i++) {
						let presetObj = self.STATE.presets.data.find((preset) => preset.id.toString() == i.toString())
						if (presetObj) {
							variableObj['preset' + i + '_enabled'] = presetObj.enable ? 'True' : 'False'
							variableObj['preset' + i + '_group'] = presetObj.group || ''
							variableObj['preset' + i + '_name'] = presetObj.name || ''
							variableObj['preset' + i + '_device_name'] = presetObj.device_name || ''
							variableObj['preset' + i + '_channel_name'] = presetObj.channel_name || ''
							variableObj['preset' + i + '_url'] = presetObj.url || ''
							variableObj['preset' + i + '_ip'] = presetObj.ip || ''
							variableObj['preset' + i + '_online'] = presetObj.online ? 'True' : 'False'
							variableObj['preset' + i + '_current'] = presetObj.current ? 'True' : 'False'
						}
					}
				}
			}

			if (self.STATE.server_info) {
				//variableObj.cpu_cores = self.STATE.server_info.data?.cpu_cores || ''
				variableObj.cpu_payload = self.STATE.server_info.data?.cpu?.precent + '%' || ''
				variableObj.mem_used = self.STATE.server_info.data?.mem?.used + 'KB' || ''
				variableObj.mem_total = self.STATE.server_info.data?.mem?.total + 'KB' || ''
				//variableObj.start_time = self.STATE.server_info.data?.start_time || ''
				variableObj.uptime = formatUptime(self.STATE.server_info.data?.persisTime?.uptime)
			}

			self.setVariableValues(variableObj)
		} catch (error) {
			self.log('error', 'Error setting Variables: ' + String(error))
		}
	},
}
