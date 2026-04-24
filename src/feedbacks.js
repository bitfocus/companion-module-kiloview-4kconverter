const { combineRgb } = require('@companion-module/base')

module.exports = {
	initFeedbacks: function () {
		let self = this
		let feedbacks = {}

		const colorWhite = combineRgb(255, 255, 255)
		const colorRed = combineRgb(255, 0, 0)
		const colorGreen = combineRgb(0, 255, 0)

		feedbacks.mode = {
			type: 'boolean',
			name: 'Converter Mode',
			description: 'Change the button color based on the Converter Mode',
			defaultStyle: {
				color: colorWhite,
				bgcolor: colorRed,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Converter Mode',
					id: 'mode',
					default: self.CHOICES_CONVERTER_MODES[0].id,
					choices: self.CHOICES_CONVERTER_MODES,
				},
			],
			callback: function (feedback, bank) {
				let options = feedback.options
				if (options.mode == self.STATE.mode) {
					return true
				}
				return false
			},
		}

		if (self.STATE.mode === 'encode') {
			feedbacks.encodeMode = {
				type: 'boolean',
				name: 'Encode Mode',
				description: 'Change the button color based on the Encode Mode',
				defaultStyle: {
					color: colorWhite,
					bgcolor: colorRed,
				},
				options: [
					{
						type: 'dropdown',
						label: 'Encode Mode',
						id: 'encode_mode',
						default: self.CHOICES_ENCODE_MODES[0].id,
						choices: self.CHOICES_ENCODE_MODES,
					},
				],
				callback: function (feedback, bank) {
					let options = feedback.options
					if (options.encode_mode == self.STATE.encode_mode) {
						return true
					}
					return false
				},
			}

			feedbacks.fullYuvMode = {
				type: 'boolean',
				name: 'NDI FULL Color Format',
				description: 'Change the button color based on the Color Format',
				defaultStyle: {
					color: colorWhite,
					bgcolor: colorRed,
				},
				options: [
					{
						type: 'dropdown',
						label: 'Color Format',
						id: 'full_yuv_mode',
						default: self.CHOICES_ENCODE_YUV_MODES[0].id,
						choices: self.CHOICES_ENCODE_YUV_MODES,
					},
				],
				callback: function (feedback, bank) {
					let options = feedback.options
					if (options.full_yuv_mode == self.STATE.full_yuv_mode) {
						return true
					}
					return false
				},
			}


			feedbacks.fullBitdepthMode = {
				type: 'boolean',
				name: 'NDI FULL Color Depth',
				description: 'Change the button color based on the Bitdepth Mode',
				defaultStyle: {
					color: colorWhite,
					bgcolor: colorRed,
				},
				options: [
					{
						type: 'dropdown',
						label: 'Color Depth',
						id: 'full_bitdepth_mode',
						default: self.CHOICES_ENCODE_BITDEPTH_MODES[0].id,
						choices: self.CHOICES_ENCODE_BITDEPTH_MODES,
					},
				],
				callback: function (feedback, bank) {
					let options = feedback.options
					if (options.full_bitdepth_mode == self.STATE.full_bitdepth_mode) {
						return true
					}
					return false
				},
			}
			
			feedbacks.hxYuvMode = {
				type: 'boolean',
				name: 'NDI HX Color Format',
				description: 'Change the button color based on the Color Format',
				defaultStyle: {
					color: colorWhite,
					bgcolor: colorRed,
				},
				options: [
					{
						type: 'dropdown',
						label: 'Color Format',
						id: 'hx_yuv_mode',
						default: self.CHOICES_ENCODE_YUV_MODES[0].id,
						choices: self.CHOICES_ENCODE_YUV_MODES,
					},
				],
				callback: function (feedback, bank) {
					let options = feedback.options
					if (options.hx_yuv_mode == self.STATE.hx_yuv_mode) {
						return true
					}
					return false
				},
			}


			feedbacks.hxBitdepthMode = {
				type: 'boolean',
				name: 'NDI HX Color Depth',
				description: 'Change the button color based on the Bitdepth Mode',
				defaultStyle: {
					color: colorWhite,
					bgcolor: colorRed,
				},
				options: [
					{
						type: 'dropdown',
						label: 'Color Depth',
						id: 'hx_bitdepth_mode',
						default: self.CHOICES_ENCODE_BITDEPTH_MODES[0].id,
						choices: self.CHOICES_ENCODE_BITDEPTH_MODES,
					},
				],
				callback: function (feedback, bank) {
					let options = feedback.options
					if (options.hx_bitdepth_mode == self.STATE.hx_bitdepth_mode) {
						return true
					}
					return false
				},
			}
			
			feedbacks.hxH26xCodec = {
				type: 'boolean',
				name: 'NDI HX Codec',
				description: 'Change the button color based on NDI HX Codec',
				defaultStyle: {
					color: colorWhite,
					bgcolor: colorRed,
				},
				options: [
					{
						type: 'dropdown',
						label: 'NDI HX Codec',
						id: 'hx_h26x_codec',
						default: self.CHOICES_ENCODE_H26x_CODECS[0].id,
						choices: self.CHOICES_ENCODE_H26x_CODECS,
					},
				],
				callback: function (feedback, bank) {
					let options = feedback.options
					if (options.hx_h26x_codec == self.STATE.hx_h26x_codec) {
						return true
					}
					return false
				},
			}
			
			
			feedbacks.netYuvMode = {
				type: 'boolean',
				name: 'Net Stream Color Format',
				description: 'Change the button color based on the Net Stream Color Format',
				defaultStyle: {
					color: colorWhite,
					bgcolor: colorRed,
				},
				options: [
					{
						type: 'dropdown',
						label: 'Color Format',
						id: 'net_yuv_mode',
						default: self.CHOICES_ENCODE_YUV_MODES[0].id,
						choices: self.CHOICES_ENCODE_YUV_MODES,
					},
				],
				callback: function (feedback, bank) {
					let options = feedback.options
					if (options.net_yuv_mode == self.STATE.net_yuv_mode) {
						return true
					}
					return false
				},
			}


			feedbacks.netBitdepthMode = {
				type: 'boolean',
				name: 'Net Stream Color Depth',
				description: 'Change the button color based on the Net Stream Color Depth',
				defaultStyle: {
					color: colorWhite,
					bgcolor: colorRed,
				},
				options: [
					{
						type: 'dropdown',
						label: 'Color Depth',
						id: 'net_bitdepth_mode',
						default: self.CHOICES_ENCODE_BITDEPTH_MODES[0].id,
						choices: self.CHOICES_ENCODE_BITDEPTH_MODES,
					},
				],
				callback: function (feedback, bank) {
					let options = feedback.options
					if (options.net_bitdepth_mode == self.STATE.net_bitdepth_mode) {
						return true
					}
					return false
				},
			}
			
			feedbacks.netH26xCodec = {
				type: 'boolean',
				name: 'Net Stream Codec',
				description: 'Change the button color based on Net Stream Codec',
				defaultStyle: {
					color: colorWhite,
					bgcolor: colorRed,
				},
				options: [
					{
						type: 'dropdown',
						label: 'Net Stream Codec',
						id: 'net_h26x_codec',
						default: self.CHOICES_ENCODE_H26x_CODECS[0].id,
						choices: self.CHOICES_ENCODE_H26x_CODECS,
					},
				],
				callback: function (feedback, bank) {
					let options = feedback.options
					if (options.net_h26x_codec == self.STATE.net_h26x_codec) {
						return true
					}
					return false
				},
			}


			feedbacks.videoSignal = {
				type: 'boolean',
				name: 'Encoder Video Signal is Online/Offline',
				description: 'If video signal is online or offline, change the colors of the button',
				defaultStyle: {
					color: colorWhite,
					bgcolor: colorRed,
				},
				options: [
					{
						type: 'dropdown',
						label: 'Change color if source is',
						id: 'compare',
						default: 'online',
						choices: [
							{ id: 'online', label: 'Online' },
							{ id: 'offline', label: 'Offline' },
						],
					},
				],
				callback: function (feedback, bank) {
					let options = feedback.options
					if (options.compare === 'online' && self.STATE.info?.data?.video_signal === true) {
						return true
					}
					if (options.compare === 'offline' && self.STATE.info?.data?.video_signal === false) {
						return true
					}

					return false
				},
			}

			feedbacks.audioSignal = {
				type: 'boolean',
				name: 'Encoder Audio Source is Online/Offline',
				description: 'If audio source is online or offline, change the colors of the button',
				defaultStyle: {
					color: colorWhite,
					bgcolor: colorRed,
				},
				options: [
					{
						type: 'dropdown',
						label: 'Change color if source is',
						id: 'compare',
						default: 'online',
						choices: [
							{ id: 'online', label: 'Online' },
							{ id: 'offline', label: 'Offline' },
						],
					},
				],
				callback: function (feedback, bank) {
					let options = feedback.options
					if (options.compare === 'online' && self.STATE.info?.data?.audio_signal === true) {
						return true
					}
					if (options.compare === 'offline' && self.STATE.info?.data?.audio_signal === false) {
						return true
					}

					return false
				},
			}

			feedbacks.hbStarted = {
				type: 'boolean',
				name: 'NDI HB Stream Started',
				description: 'If NDI HB stream is started, change the colors of the button',
				defaultStyle: {
					color: colorWhite,
					bgcolor: colorGreen,
				},
				options: [],
				callback: function (feedback, bank) {
					return self.STATE.info?.data?.main_full?.started === true
				},
			}

			feedbacks.hxStarted = {
				type: 'boolean',
				name: 'NDI HX Stream Started',
				description: 'If NDI HX stream is started, change the colors of the button',
				defaultStyle: {
					color: colorWhite,
					bgcolor: colorGreen,
				},
				options: [],
				callback: function (feedback, bank) {
					return self.STATE.info?.data?.main?.started === true
				},
			}

			feedbacks.netStreamStarted = {
				type: 'boolean',
				name: 'Net Stream Started',
				description: 'If Net Stream is started, change the colors of the button',
				defaultStyle: {
					color: colorWhite,
					bgcolor: colorGreen,
				},
				options: [],
				callback: function (feedback, bank) {
					return self.STATE.info?.data?.multi_protocol?.started === true
				},
			}
		} else {
			feedbacks.online = {
				type: 'boolean',
				name: 'Selected NDI Source is Online/Offline',
				description: 'If selected NDI source is online or offline, change the colors of the button',
				defaultStyle: {
					color: colorWhite,
					bgcolor: colorRed,
				},
				options: [
					{
						type: 'dropdown',
						label: 'Change color if source is',
						id: 'compare',
						default: 'online',
						choices: [
							{ id: 'online', label: 'Online' },
							{ id: 'offline', label: 'Offline' },
						],
					},
				],
				callback: function (feedback, bank) {
					let options = feedback.options
					if (options.compare === 'online' && self.STATE?.info?.data?.online === true) {
						return true
					}
					if (options.compare === 'offline' && self.STATE?.info?.data?.online === false) {
						return true
					}
					return false
				},
			}

			feedbacks.presetEnabled = {
				type: 'boolean',
				name: 'Selected Preset is Enabled',
				description: 'If selected preset is enabled, change the colors of the button',
				defaultStyle: {
					color: colorWhite,
					bgcolor: colorRed,
				},
				options: [
					{
						type: 'dropdown',
						label: 'Preset',
						id: 'preset',
						default: self.CHOICES_PRESETS[1].id,
						choices: self.CHOICES_PRESETS.filter((p) => p.id !== '0'),
					},
				],
				callback: function (feedback, bank) {
					let options = feedback.options
					let preset = self.STATE.presets?.data?.find((preset) => preset.id.toString() === options.preset.toString())

					if (preset && preset.enable) {
						return true
					}

					return false
				},
			}

			feedbacks.presetCurrent = {
				type: 'boolean',
				name: 'Selected Preset is Current Preset',
				description: 'If selected preset is the current preset, change the colors of the button',
				defaultStyle: {
					color: colorWhite,
					bgcolor: colorRed,
				},
				options: [
					{
						type: 'dropdown',
						label: 'Preset',
						id: 'preset',
						default: self.CHOICES_PRESETS[1].id,
						choices: self.CHOICES_PRESETS.filter((p) => p.id !== '0'),
					},
					{
						type: 'dropdown',
						label: 'Change color if preset is',
						id: 'compare',
						default: true,
						choices: [
							{ id: true, label: 'Current' },
							{ id: false, label: 'Not Current' },
						],
					},
				],
				callback: function (feedback, bank) {
					let options = feedback.options

					if (self.STATE.presets && self.STATE.presets.data) {
						let preset = self.STATE.presets.data.find((preset) => preset.id.toString() === options.preset.toString())

						if (preset && preset.current == options.compare) {
							return true
						}
					}

					return false
				},
			}

			feedbacks.outputResolution = {
				type: 'boolean',
				name: 'Output Resolution is Current Resolution',
				description: 'If selected resolution is the current output resolution, change the colors of the button',
				defaultStyle: {
					color: colorWhite,
					bgcolor: colorRed,
				},
				options: [
					{
						type: 'dropdown',
						label: 'Resolution',
						id: 'resolution',
						default: 'auto',
						choices: [
							{ id: 'auto', label: 'Auto' },
							{ id: '4096x2160', label: '4096x2160' },
							{ id: '3840x2160', label: '3840x2160' },
							{ id: '1920x1080', label: '1920x1080' },
							{ id: '1280x720', label: '1280x720' },
						],
					},
				],
				callback: function (feedback, bank) {
					let options = feedback.options

					if (self.STATE.info?.data?.output_resolution_choose === options.resolution) {
						return true
					}

					return false
				},
			}

			feedbacks.outputFrameRate = {
				type: 'boolean',
				name: 'Output Frame Rate is Current Frame Rate',
				description: 'If selected frame rate is the current output frame rate, change the colors of the button',
				defaultStyle: {
					color: colorWhite,
					bgcolor: colorRed,
				},
				options: [
					{
						type: 'dropdown',
						label: 'Frame Rate',
						id: 'frame_rate',
						default: 0,
						choices: [
							{ id: 0, label: 'Auto' },
							{ id: 23.98, label: '23.98' },
							{ id: 24, label: '24' },
							{ id: 25, label: '25' },
							{ id: 29.97, label: '29.97' },
							{ id: 30, label: '30' },
							{ id: 50, label: '50' },
							{ id: 59.94, label: '59.94' },
							{ id: 60, label: '60' },
						],
					},
				],
				callback: function (feedback, bank) {
					let options = feedback.options

					if (self.STATE.info?.data?.output_framerate == options.frame_rate) {
						return true
					}

					return false
				},
			}
		}

		self.setFeedbackDefinitions(feedbacks)
	},
}
