const { combineRgb } = require('@companion-module/base')

module.exports = {
	initPresets: function () {
		let self = this
		let presets = []

		const colorWhite = combineRgb(255, 255, 255)
		const colorBlack = combineRgb(0, 0, 0)
		const colorRed = combineRgb(255, 0, 0)
		const colorGreen = combineRgb(0, 255, 0)
		const colorBlue = combineRgb(0, 0, 255)
		const colorYellow = combineRgb(255, 255, 0)
		const colorOrange = combineRgb(255, 165, 0)
		const colorPurple = combineRgb(128, 0, 128)
		const colorCyan = combineRgb(0, 255, 255)

		presets = [
			{
				category: 'General',
				type: 'button',
				name: 'Set Converter Mode to Encoder',
				style: {
					text: 'Encoder',
					size: '18',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [
					{
						down: [
							{
								actionId: 'modeSwitch',
								options: {
									mode: 'encode',
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'mode',
						options: {
							mode: 'encode',
						},
						style: {
							color: colorWhite,
							bgcolor: colorRed,
						},
					},
				],
			},
			{
				category: 'General',
				type: 'button',
				name: 'Set Converter Mode to Decoder',
				style: {
					text: 'Decoder',
					size: '18',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [
					{
						down: [
							{
								actionId: 'modeSwitch',
								options: {
									mode: 'decode',
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'mode',
						options: {
							mode: 'decode',
						},
						style: {
							color: colorWhite,
							bgcolor: colorRed,
						},
					},
				],
			},
			{
				category: 'General',
				type: 'button',
				name: 'Toggle Converter Mode',
				style: {
					text: 'Toggle',
					size: '18',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [
					{
						down: [
							{
								actionId: 'toggleMode',
							},
						],
						up: [],
					},
				],
			},
			{
				category: 'General',
				type: 'button',
				name: 'Refresh Device Status',
				style: {
					text: 'Refresh',
					size: '14',
					color: colorWhite,
					bgcolor: colorBlue,
				},
				steps: [
					{
						down: [
							{
								actionId: 'refreshStatus',
							},
						],
						up: [],
					},
				],
			},
			{
				category: 'General',
				type: 'button',
				name: 'Reboot Device',
				style: {
					text: 'Reboot',
					size: '14',
					color: colorWhite,
					bgcolor: colorRed,
				},
				steps: [
					{
						down: [
							{
								actionId: 'reboot',
							},
						],
						up: [],
					},
				],
			},
			{
				category: 'Info',
				type: 'button',
				name: 'Display Current Mode',
				style: {
					text: 'Mode:\n$(kiloview:mode)',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [],
			},
			{
				category: 'Info',
				type: 'button',
				name: 'Display Hostname',
				style: {
					text: 'Host:\n$(kiloview:hostname)',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [],
			},
			{
				category: 'Info',
				type: 'button',
				name: 'Product Type',
				style: {
					text: 'Product Type:\n$(kiloview:product)',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [],
			},
			{
				category: 'Info',
				type: 'button',
				name: 'Device Serial Number',
				style: {
					text: 'Serial Number:\n$(kiloview:serial_number)',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [],
			},
			{
				category: 'Info',
				type: 'button',
				name: 'Device Fireware Version',
				style: {
					text: 'Firmware Version:\n$(kiloview:firmware_version)',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [],
			},
			
		]

		if (self.STATE.mode === 'encode') {
			presets.push({
				category: 'Encoder',
				type: 'button',
				name: 'Encoder Video Signal',
				style: {
					text: 'Video:\n$(kiloview:video_signal)',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [
					{
						feedbackId: 'videoSignal',
						options: {
							compare: 'online',
						},
						style: {
							color: colorWhite,
							bgcolor: colorGreen,
						},
					},
					{
						feedbackId: 'videoSignal',
						options: {
							compare: 'offline',
						},
						style: {
							color: colorWhite,
							bgcolor: colorRed,
						},
					},
				],
			})

			presets.push({
				category: 'Encoder',
				type: 'button',
				name: 'Encoder Audio Signal',
				style: {
					text: 'Audio:\n$(kiloview:audio_signal)',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [
					{
						feedbackId: 'audioSignal',
						options: {
							compare: 'online',
						},
						style: {
							color: colorWhite,
							bgcolor: colorGreen,
						},
					},
					{
						feedbackId: 'audioSignal',
						options: {
							compare: 'offline',
						},
						style: {
							color: colorWhite,
							bgcolor: colorRed,
						},
					},
				],
			})

			presets.push({
				category: 'Encoder',
				type: 'button',
				name: 'NDI HB Stream Status',
				style: {
					text: 'HB:\n$(kiloview:hb_started)',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [
					{
						feedbackId: 'hbStarted',
						style: {
							color: colorWhite,
							bgcolor: colorGreen,
						},
					},
				],
			})

			presets.push({
				category: 'Encoder',
				type: 'button',
				name: 'NDI HX Stream Status',
				style: {
					text: 'HX:\n$(kiloview:hx_started)',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [
					{
						feedbackId: 'hxStarted',
						style: {
							color: colorWhite,
							bgcolor: colorGreen,
						},
					},
				],
			})

			presets.push({
				category: 'Encoder',
				type: 'button',
				name: 'Net Stream Status',
				style: {
					text: 'Net:\n$(kiloview:net_started)',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [
					{
						feedbackId: 'netStreamStarted',
						style: {
							color: colorWhite,
							bgcolor: colorGreen,
						},
					},
				],
			})

			presets.push({
				category: 'Encoder',
				type: 'button',
				name: 'Current Encode Mode',
				style: {
					text: 'Encode:\n$(kiloview:encode_mode)',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [],
			})


			presets.push({
				category: 'Encoder NDI FULL',
				type: 'button',
				name: 'Current NDI FULL Color Format',
				style: {
					text: 'Color Format:\n$(kiloview:full_yuv_mode)',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [],
			})

			presets.push({
				category: 'Encoder NDI FULL',
				type: 'button',
				name: 'Current NDI FULL Color Depth',
				style: {
					text: 'Color Depth:\n$(kiloview:full_bitdepth_mode)',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [],
			})

			presets.push({
				category: 'Encoder NDI FULL',
				type: 'button',
				name: 'Current NDI FULL Bitrate',
				style: {
					text: 'Bitrate:\n$(kiloview:hb_bitrate)',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [],
			})
			
			
			presets.push({
				category: 'Encoder NDI HX',
				type: 'button',
				name: 'Current NDI HX Color Format',
				style: {
					text: 'Color Format:\n$(kiloview:hx_yuv_mode)',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [],
			})

			presets.push({
				category: 'Encoder NDI HX',
				type: 'button',
				name: 'Current NDI HX Color Depth',
				style: {
					text: 'Color Depth:\n$(kiloview:hx_bitdepth_mode)',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [],
			})

			presets.push({
				category: 'Encoder NDI HX',
				type: 'button',
				name: 'Current NDI HX Bitrate',
				style: {
					text: 'Bitrate:\n$(kiloview:hx_bitrate)',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [],
			})
			

			presets.push({
				category: 'Encoder NDI HX',
				type: 'button',
				name: 'Current NDI HX Codec',
				style: {
					text: 'HX Codec:\n$(kiloview:hx_h26x_codec)',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [],
			})
			
			presets.push({
				category: 'Encoder Net Stream',
				type: 'button',
				name: 'Current Net Stream Color Format',
				style: {
					text: 'Color Format:\n$(kiloview:net_yuv_mode)',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [],
			})

			presets.push({
				category: 'Encoder Net Stream',
				type: 'button',
				name: 'Current Net Stream Color Depth',
				style: {
					text: 'Color Depth:\n$(kiloview:net_bitdepth_mode)',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [],
			})

			presets.push({
				category: 'Encoder Net Stream',
				type: 'button',
				name: 'Current Net Stream Bitrate',
				style: {
					text: 'Bitrate:\n$(kiloview:net_bitrate)',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [],
			})

			presets.push({
				category: 'Encoder Net Stream',
				type: 'button',
				name: 'Current Net Stream Codec',
				style: {
					text: 'Net Stream Codec:\n$(kiloview:net_h26x_codec)',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [],
			})

			for(let i = 0; i < self.CHOICES_ENCODE_MODES.length; i++) {
				let displayText = self.CHOICES_ENCODE_MODES[i].label
				let mode = self.CHOICES_ENCODE_MODES[i].id
				presets.push({
					category: 'Encoder Mode',
					type: 'button',
					name: `Set Encode Mode: ${displayText}`,
					style: {
						text: displayText,
						size: '14',
						color: colorWhite,
						bgcolor: colorBlack,
					},
					steps: [
						{
							down: [
								{
									actionId: 'chooseEncodeMode',
									options: {
										mode: mode,
									},
								},
							],
							up: [],
						},
					],
					feedbacks: [
						{
							feedbackId: 'encodeMode',
							options: {
								encode_mode: mode,
								compare: true,
							},
							style: {
								color: colorWhite,
								bgcolor: colorRed,
							},
						},
					],
				})
 			}

			for(let i = 0; i < self.CHOICES_ENCODE_YUV_MODES.length; i++) {
				let displayText = self.CHOICES_ENCODE_YUV_MODES[i].label
				let yuv_mode = self.CHOICES_ENCODE_YUV_MODES[i].id
				presets.push({
					category: 'Encoder NDI FULL',
					type: 'button',
					name: `Set NDI FULL Color Format: ${displayText}`,
					style: {
						text: displayText,
						size: '14',
						color: colorWhite,
						bgcolor: colorBlack,
					},
					steps: [
						{
							down: [
								{
									actionId: 'setFullYUVMode',
									options: {
										full_yuv_mode: yuv_mode,
									},
								},
							],
							up: [],
						},
					],
					feedbacks: [
						{
							feedbackId: 'fullYuvMode',
							options: {
								full_yuv_mode: yuv_mode,
								compare: true,
							},
							style: {
								color: colorWhite,
								bgcolor: colorRed,
							},
						},
					],
				})
				
				presets.push({
					category: 'Encoder NDI HX',
					type: 'button',
					name: `Set NDI HX Color Format: ${displayText}`,
					style: {
						text: displayText,
						size: '14',
						color: colorWhite,
						bgcolor: colorBlack,
					},
					steps: [
						{
							down: [
								{
									actionId: 'setHxYUVMode',
									options: {
										hx_yuv_mode: yuv_mode,
									},
								},
							],
							up: [],
						},
					],
					feedbacks: [
						{
							feedbackId: 'hxYuvMode',
							options: {
								hx_yuv_mode: yuv_mode,
								compare: true,
							},
							style: {
								color: colorWhite,
								bgcolor: colorRed,
							},
						},
					],
				})
				
				if(i === 0){//skip Net Stream "Auto" button
					continue
				}
				
				presets.push({
					category: 'Encoder Net Stream',
					type: 'button',
					name: `Set Net Stream Color Format: ${displayText}`,
					style: {
						text: displayText,
						size: '14',
						color: colorWhite,
						bgcolor: colorBlack,
					},
					steps: [
						{
							down: [
								{
									actionId: 'setNetYUVMode',
									options: {
										net_yuv_mode: yuv_mode,
									},
								},
							],
							up: [],
						},
					],
					feedbacks: [
						{
							feedbackId: 'netYuvMode',
							options: {
								net_yuv_mode: yuv_mode,
								compare: true,
							},
							style: {
								color: colorWhite,
								bgcolor: colorRed,
							},
						},
					],
				})
			}

			for(let i = 0; i < self.CHOICES_ENCODE_H26x_CODECS.length; i++) {
				let displayText = self.CHOICES_ENCODE_H26x_CODECS[i].label
				let h26x_codec = self.CHOICES_ENCODE_H26x_CODECS[i].id
				presets.push({
					category: 'Encoder NDI HX',
					type: 'button',
					name: `Set NDI HX Codec: ${displayText}`,
					style: {
						text: displayText,
						size: '14',
						color: colorWhite,
						bgcolor: colorBlack,
					},
					steps: [
						{
							down: [
								{
									actionId: 'setHxH26xCodec',
									options: {
										hx_h26x_codec: h26x_codec,
									},
								},
							],
							up: [],
						},
					],
					feedbacks: [
						{
							feedbackId: 'hxH26xCodec',
							options: {
								hx_h26x_codec: h26x_codec,
								compare: true,
							},
							style: {
								color: colorWhite,
								bgcolor: colorRed,
							},
						},
					],
				})
				
				presets.push({
					category: 'Encoder Net Stream',
					type: 'button',
					name: `Set Net Stream Codec: ${displayText}`,
					style: {
						text: displayText,
						size: '14',
						color: colorWhite,
						bgcolor: colorBlack,
					},
					steps: [
						{
							down: [
								{
									actionId: 'setNetH26xCodec',
									options: {
										net_h26x_codec: h26x_codec,
									},
								},
							],
							up: [],
						},
					],
					feedbacks: [
						{
							feedbackId: 'netH26xCodec',
							options: {
								net_h26x_codec: h26x_codec,
								compare: true,
							},
							style: {
								color: colorWhite,
								bgcolor: colorRed,
							},
						},
					],
				})
			}

			for(let i = 0; i < self.CHOICES_ENCODE_BITDEPTH_MODES.length; i++) {
				let displayText = self.CHOICES_ENCODE_BITDEPTH_MODES[i].label
				let bitdepth_mode = self.CHOICES_ENCODE_BITDEPTH_MODES[i].id
				presets.push({
					category: 'Encoder NDI FULL',
					type: 'button',
					name: `Set NDI FULL Color Depth: ${displayText}`,
					style: {
						text: displayText,
						size: '14',
						color: colorWhite,
						bgcolor: colorBlack,
					},
					steps: [
						{
							down: [
								{
									actionId: 'setFullBitdepthMode',
									options: {
										full_bitdepth_mode: bitdepth_mode,
									},
								},
							],
							up: [],
						},
					],
					feedbacks: [
						{
							feedbackId: 'fullBitdepthMode',
							options: {
								full_bitdepth_mode: bitdepth_mode,
								compare: true,
							},
							style: {
								color: colorWhite,
								bgcolor: colorRed,
							},
						},
					],
				})

				presets.push({
					category: 'Encoder NDI HX',
					type: 'button',
					name: `Set NDI HX Color Depth: ${displayText}`,
					style: {
						text: displayText,
						size: '14',
						color: colorWhite,
						bgcolor: colorBlack,
					},
					steps: [
						{
							down: [
								{
									actionId: 'setHxBitdepthMode',
									options: {
										hx_bitdepth_mode: bitdepth_mode,
									},
								},
							],
							up: [],
						},
					],
					feedbacks: [
						{
							feedbackId: 'hxBitdepthMode',
							options: {
								hx_bitdepth_mode: bitdepth_mode,
								compare: true,
							},
							style: {
								color: colorWhite,
								bgcolor: colorRed,
							},
						},
					],
				})
				
				presets.push({
					category: 'Encoder Net Stream',
					type: 'button',
					name: `Set Net Stream Color Depth: ${displayText}`,
					style: {
						text: displayText,
						size: '14',
						color: colorWhite,
						bgcolor: colorBlack,
					},
					steps: [
						{
							down: [
								{
									actionId: 'setNetBitdepthMode',
									options: {
										net_bitdepth_mode: bitdepth_mode,
									},
								},
							],
							up: [],
						},
					],
					feedbacks: [
						{
							feedbackId: 'netBitdepthMode',
							options: {
								net_bitdepth_mode: bitdepth_mode,
								compare: true,
							},
							style: {
								color: colorWhite,
								bgcolor: colorRed,
							},
						},
					],
				})
			}

		} else {
			presets.push({
				category: 'Decoder',
				type: 'button',
				name: 'Online State',
				style: {
					text: '$(kiloview:online_state)',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [
					{
						feedbackId: 'online',
						options: {
							compare: 'online',
						},
						style: {
							color: colorWhite,
							bgcolor: colorGreen,
						},
					},
					{
						feedbackId: 'online',
						options: {
							compare: 'offline',
						},
						style: {
							color: colorWhite,
							bgcolor: colorRed,
						},
					},
				],
			})

			for (let i = 1; i <= 10; i++) {
				let display_name = (i == 10 ? ' Blank' : i)
				let sytle_text = (i == 10 ? 'Blank' : `P${display_name}\n$(kiloview:preset${i}_name)`)
				presets.push({
					category: 'Decoder',
					type: 'button',
					name: 'Go to Preset ' + display_name,
					style: {
						text: sytle_text,
						size: '14',
						color: colorWhite,
						bgcolor: colorBlack,
					},
					steps: [
						{
							down: [
								{
									actionId: 'setPreset',
									options: {
										preset: String(i),
									},
								},
							],
							up: [],
						},
					],
					feedbacks: [
						{
							feedbackId: 'presetCurrent',
							options: {
								preset: String(i),
								compare: true,
							},
							style: {
								color: colorWhite,
								bgcolor: colorRed,
							},
						},
					],
				})
			}

			presets.push({
				category: 'Decoder',
				type: 'button',
				name: 'Refresh NDI Sources',
				style: {
					text: 'Refresh\nSources',
					size: '14',
					color: colorWhite,
					bgcolor: colorBlue,
				},
				steps: [
					{
						down: [
							{
								actionId: 'refreshSources',
							},
						],
						up: [],
					},
				],
			})

			for (let i = 0; i < self.CHOICES_RESOLUTION.length; i++) { 
				presets.push({
					category: 'Decoder Output Resolution',
					type: 'button',
					name: 'Set Output Resolution: ' + self.CHOICES_RESOLUTION[i].label,
					style: {
						text: (i == 0 ? 'Auto' : self.CHOICES_RESOLUTION[i].label)+ '\nResolution',
						size: '14',
						color: colorWhite,
						bgcolor: colorBlack,
					},
					steps: [
						{
							down: [
								{
									actionId: 'setOutputResolution',
									options: {
										resolution: self.CHOICES_RESOLUTION[i].id,
									},
								},
							],
							up: [],
						},
					],
					feedbacks: [
						{
							feedbackId: 'outputResolution',
							options: {
								resolution: self.CHOICES_RESOLUTION[i].id,
							},
							style: {
								color: colorWhite,
								bgcolor: colorRed,
							},
						},
					],
				})
			}

			for (let i = 0; i < self.CHOICES_FRAME_RATE.length; i++) { 
				presets.push({
					category: 'Decoder Output Resolution',
					type: 'button',
					name: 'Set Output Frame Rate: ' +  self.CHOICES_FRAME_RATE[i].label,
					style: {
						text: (i == 0 ? 'Auto' : self.CHOICES_FRAME_RATE[i].label) + '\nfps',
						size: '14',
						color: colorWhite,
						bgcolor: colorBlack,
					},
					steps: [
						{
							down: [
								{
									actionId: 'setOutputFrameRate',
									options: {
										frame_rate: self.CHOICES_FRAME_RATE[i].id,
									},
								},
							],
							up: [],
						},
					],
					feedbacks: [
						{
							feedbackId: 'outputFrameRate',
							options: {
								frame_rate: self.CHOICES_FRAME_RATE[i].id,
							},
							style: {
								color: colorWhite,
								bgcolor: colorRed,
							},
						},
					],
				})
			}
			
			presets.push({
				category: 'Decoder Info',
				type: 'button',
				name: 'Stream Name',
				style: {
					text: '$(kiloview:streamname)',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [],
			})

			presets.push({
				category: 'Decoder Info',
				type: 'button',
				name: 'IP Address',
				style: {
					text: '$(kiloview:ip)',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [],
			})

			presets.push({
				category: 'Decoder Info',
				type: 'button',
				name: 'URL Address',
				style: {
					text: '$(kiloview:url)',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [],
			})

			presets.push({
				category: 'Decoder Info',
				type: 'button',
				name: 'Resolution',
				style: {
					text: '$(kiloview:resolution)',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [],
			})


			presets.push({
				category: 'Decoder Info',
				type: 'button',
				name: 'Codec',
				style: {
					text: '$(kiloview:codec)',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [],
			})

			presets.push({
				category: 'Decoder Info',
				type: 'button',
				name: 'Bitrate / Frame Rate',
				style: {
					text: '$(kiloview:bitrate) / $(kiloview:frame_rate)fps',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [],
			})

			presets.push({
				category: 'Decoder Info',
				type: 'button',
				name: 'Color Depth',
				style: {
					text: '$(kiloview:color_depth)',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [],
			})

			presets.push({
				category: 'Decoder Info',
				type: 'button',
				name: 'Sampling',
				style: {
					text: '$(kiloview:color_sampling)',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [],
			})

			presets.push({
				category: 'Decoder Info',
				type: 'button',
				name: 'Aspect Ratio',
				style: {
					text: '$(kiloview:aspect_ratio)',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [],
			})



			presets.push({
				category: 'Decoder Info',
				type: 'button',
				name: 'Audio Format',
				style: {
					text: '$(kiloview:audio_format)',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [],
			})

			presets.push({
				category: 'Decoder Info',
				type: 'button',
				name: 'Output Resolution',
				style: {
					text: '$(kiloview:output_resolution)',
					size: 'auto',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [],
				feedbacks: [],
			})
		}//end else

		

		self.setPresetDefinitions(presets)
	},
}
