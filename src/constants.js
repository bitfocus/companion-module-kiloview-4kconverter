module.exports = {
	POLLINGRATE: 1000,
	POLLINGRATE_SOURCES: 10000,
	RECONNECT_TIME: 30000,
	DEVICE: undefined,

	CHOICES_SOURCES: [{ id: 'null', url: '', label: '- No sources available -' }],

	STATE: {
		mode: 'N/A',
		encode_mode: 'N/A',
		full_yuv_mode: 'N/A',
		full_bitdepth_mode: 'N/A',
		hx_yuv_mode: 'N/A',
		hx_bitdepth_mode: 'N/A',
		hx_h26x_codec: 'N/A',
		net_yuv_mode: 'N/A',
		net_bitdepth_mode: 'N/A',
		net_h26x_codec: 'N/A',
	},

	CHOICES_CONVERTER_MODES: [
		{
			id: 'encode',
			label: 'Encoder',
		},
		{
			id: 'decode',
			label: 'Decoder',
		},
	],

	CHOICES_ENCODE_MODES: [
		{ id: 'hb_hx', label: 'HB + HX' },
		{ id: 'hb_net', label: 'HB + Net' },
		{ id: 'hb_rec', label: 'HB + Rec' },
		{ id: 'hb', label: 'HB Only' },
		{ id: 'hx', label: 'HX Only' },
		{ id: 'net', label: 'Net Only' },
	],


	CHOICES_ENCODE_YUV_MODES: [
		{ id: 'auto', label: 'Auto', mode: 0 },
		{ id: 'YCbCr 4:2:0', label: 'YCbCr 4:2:0', mode: 1},
		{ id: 'YCbCr 4:2:2', label: 'YCbCr 4:2:2', mode: 1},
	],

	CHOICES_ENCODE_H26x_CODECS: [
		{ id: 1, label: 'H264' },
		{ id: 2, label: 'H265' },
	],

	CHOICES_ENCODE_BITDEPTH_MODES: [
		{ id: 0, label: '8bit' },
		{ id: 1, label: '10bit' },
	],



	CHOICES_ENCODER_STREAMS: [
		{ id: 'main', label: 'NDI HX Stream' },
		{ id: 'main_full', label: 'NDI HB Stream' },
		{ id: 'multi_protocol', label: 'Multi Protocol Stream' },
	],

	CHOICES_NDI_CONNECTION: [
		{ id: 'auto', label: 'Auto' },
		{ id: 'single-tcp', label: 'Single TCP' },
		{ id: 'multi-tcp', label: 'Multi TCP' },
		{ id: 'rudp', label: 'RUDP' },
		{ id: 'unicast', label: 'Unicast' },
		{ id: 'multicast', label: 'Multicast' },
	],

	CHOICES_AUDIO_SOURCE: [
		{ id: 'hdmi', label: 'HDMI (N60/FN60)' },
		{ id: 'sdi', label: 'SDI (N50/FN50)' },
	],

	CHOICES_NET_STREAM_PROTOCOL: [
		{ id: 'rtmp', label: 'RTMP' },
		{ id: 'hls', label: 'HLS' },
		{ id: 'udp', label: 'UDP' },
		{ id: 'rtp', label: 'RTP' },
		{ id: 'srt', label: 'SRT' },
		{ id: 'rtsp', label: 'RTSP' },
	],

	CHOICES_PRESETS: [
		{ id: '0', label: 'Blank' },
		{ id: '1', label: 'Preset 1' },
		{ id: '2', label: 'Preset 2' },
		{ id: '3', label: 'Preset 3' },
		{ id: '4', label: 'Preset 4' },
		{ id: '5', label: 'Preset 5' },
		{ id: '6', label: 'Preset 6' },
		{ id: '7', label: 'Preset 7' },
		{ id: '8', label: 'Preset 8' },
		{ id: '9', label: 'Preset 9' },
	],

	CHOICES_RESOLUTION: [
		{ id: 'auto', label: 'Use Source Resolution' },
		{ id: '1280x720', label: '1280x720' },
		{ id: '1920x1080', label: '1920x1080' },
		{ id: '3840x2160', label: '3840x2160' },
		{ id: '4096x2160', label: '4096x2160' },
	],

	CHOICES_FRAME_RATE: [
		{ id: 0, label: 'Use Source Frame Rate' },
		{ id: 24, label: '24' },
		{ id: 25, label: '25' },
		{ id: 29.97, label: '29.97' },
		{ id: 30, label: '30' },
		{ id: 50, label: '50' },
		{ id: 59.94, label: '59.94' },
		{ id: 60, label: '60' },
	],

	CHOICES_SAMPLE_RATE: [
		{ id: 0, label: 'Use Source Sample Rate' },
		{ id: 44100, label: '44.1 kHz' },
		{ id: 48000, label: '48 kHz' },
	],

	INTERVAL: null,
	INTERVAL_SOURCES: null,
	RECONNECT_INTERVAL: null,
}
