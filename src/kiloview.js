const http = require('http')
const https = require('https')

class kiloviewNDI {
	connection_info = {
		ip: '',
		username: '',
		password: '',
		protocol: 'https',
		port: 443,
	}

	session = {
		token: '',
	}

	owner = null

	log(level, message) {
		this.owner.log(level, message)
	}

	constructor(owner, ip, username, password, protocol = 'https', port = 443, timeout = 2000) {
		this.owner = owner
		this.connection_info = {
			ip,
			username,
			password,
			protocol,
			port,
		}

		this.baseURL = `${protocol}://${ip}:${port}/api`

		const agentOpts = {
			keepAlive: true,
			keepAliveMsecs: 30000,
			maxSockets: 5,
		}

		this.httpAgent = new http.Agent(agentOpts)
		this.httpsAgent = new https.Agent({
			...agentOpts,
			rejectUnauthorized: false,
		})

		this.authorized = false
	}

	_request(method, path, data) {
		return new Promise((resolve, reject) => {
			const isHttps = this.connection_info.protocol === 'https'
			const urlObj = new URL(`${this.baseURL}${path}`)
			const options = {
				hostname: urlObj.hostname,
				port: urlObj.port || (isHttps ? 443 : 80),
				path: urlObj.pathname + urlObj.search,
				method: method,
				rejectUnauthorized: false,
				agent: isHttps ? this.httpsAgent : this.httpAgent,
				headers: {
					'Content-Type': 'application/json',
					'Connection': 'keep-alive',
					'Authorization': `${this.session.token}`,
					'App': JSON.stringify({
						user: this.connection_info.username,
						token: this.session.token,
						language: 'en',
					}),
				},
			}

			const req = (isHttps ? https : http).request(options, (res) => {
				let body = ''
				res.on('data', (chunk) => { body += chunk })
				res.on('end', () => {
					try {
						resolve(JSON.parse(body))
					} catch (e) {
						resolve(body)
					}
				})
			})

			req.on('error', (err) => {
				let error = new Error(err.message)
				error.name = 'KiloviewNDIError'
				reject(error)
			})

			if (data && method === 'POST') {
				req.write(JSON.stringify(data))
			}

			req.end()
		})
	}

	setAuthorized(auth) {
		this.authorized = auth
	}

	async authorize() {
		try {
			const { username, password } = this.connection_info

			const params = {
				username: username,
				password: password
			}

			let result = await this._request('POST', '/systemctrl/users/login', params)

			if (result && result.result !== 'ok') {
				let error = new Error(result.msg || 'Authorization failed')
				error.name = 'KiloviewNDIError'
				throw error
			}

			this.session = {
				token: result.data.token,
			}

			this.alias = result.data.alias || username

			//create headers object for future requests
			this.headers = {
				'Authorization': `${this.session.token}`,
				'Content-Type': 'application/json',
				'App': {
					"user": `${this.connection_info.username}`,
					"token": `${this.session.token}`,
					"language": "en",
				}
			}
			this.authorized = true

			return true
		} catch (error) {
			if (error.name !== 'KiloviewNDIError') {
				let newError = new Error('Could not reach device')
				newError.name = 'KiloviewNDIError'
				throw newError
			}
			throw error
		}
	}

	async authGet(url, params = {}) {
		if (!this.authorized) {
			await this.authorize()
		}

		const queryString = new URLSearchParams(params).toString()
		const fullPath = url + (queryString ? '?' + queryString : '')

		let result = await this._request('GET', fullPath)

		if (result && (result.code === 401 || result.result === 'error')) {
			await this.authorize()
			return this.authGet(url, params)
		} else {
			if (url.indexOf('/mode/get') > 0) {
				let jsonResult = JSON.stringify(result)
				let mode = "decode"
				if(jsonResult.indexOf("encode") > 0){
					mode = "encode"
				}

				return {
					result: "ok",
					data : {mode:  mode}
				}
			}

			if (result && result.result && result.result !== 'ok') {
				let error = new Error(result.msg || 'API Error')
				error.name = 'KiloviewNDIError'
				throw error
			}

			return result
		}
	}

	async authPost(url, data = {}) {
		//this.log('debug', 'authPost:' + url)
		if (!this.authorized) {
			await this.authorize()
		}

		let result = await this._request('POST', url, data)

		if (result && (result.code === 401 || result.result === 'error')) {
			await this.authorize()
			return this.authPost(url, data)
		} else {
			if (result && result.result && result.result !== 'ok') {
				let error = new Error(result.msg || 'API Error')
				error.name = 'KiloviewNDIError'
				throw error
			}

			return result
		}
	}

	async checkAuth() {
		return await this.authGet('/systemctrl/users/auth_info_get')
	}

	async modeGet() {
		return await this.authGet('/codec/mode/get')
	}

	async modeSet(mode) {
		return await this.authPost(`/codec/mode/set?mode=${mode}`)
	}

	async getHostname() {
		return await this.authGet('/systemctrl/system/getHostname')
	}

	async getSystemInfo() {
		return await this.authGet('/systemctrl/system/getSystemInfo?version=true&cpu=true&disk=true&persisTime=true&memory=true')
	}

	async chooseEncode(encode_mode) {
		return await this.authPost('/codec/encoders/choose_encode', { encode_mode })
	}

	async getEncode() {
		return await this.authGet('/codec/encoders/get_encode')
	}

	async getEncodeSignal() {
		return await this.authGet('/codec/encoders/signal_status')
	}

	async getEncodeBitrates() {
		return await this.authGet('/codec/encoders/get_dynamic_states')
	}


	async getEncoderParams(encoder_stream) {
		return await this.authPost(`/codec/encoder/${encoder_stream}/get`)
	}

	async setEncoderParams(encoder_stream, params) {
		let newParams = {...params}
		newParams.key = `${encoder_stream}`
		return await this.authPost(`/codec/encoder/${encoder_stream}/set`, newParams)
	}

	async setEncoderMultiProtocolParams(params) {
		return await this.authPost(`/codec/encoder/multi_protocol/set`, params)
	}

	async setAudio(params) {
		return await this.authPost('/codec/audio/set', params)
	}

	async getNDIStreams(encoder_name) {
		return await this.authGet(`/codec/streams/${encoder_name}/get`)
	}

	async getStreamParams(stream_name, stream_key) {
		return await this.authGet(`/codec/streams/${stream_name}/${stream_key}/get`)
	}

	async setStreamParams(stream_name, stream_key, params) {
		return await this.authPost(`/codec/streams/${stream_name}/${stream_key}/set`, params)
	}

	async getMultiProtocolStream(stream_name) {
		return await this.authGet(`/codec/streams/multi_protocol/get?stream_name=${stream_name}`)
	}

	async setMultiProtocolStream(stream_name, params) {
		return await this.authPost('/codec/streams/multi_protocol/set', { stream_name, ...params })
	}

	//{"stream_name":"rtsp","stream_enable":false}s
	async setMultiProtocolEnableStream(params) {
		return await this.authPost('/codec/streams/multi_protocol/enable_stream', params)
	}
	async decodeAddSpec(name, url, group = '') {
		return await this.authPost('/codec/decode/addSpec', { name, url, group })
	}

	async decodeAdd(id) {
		return await this.authPost('/codec/decode/add', { id })
	}

	async decodeGet() {
		return await this.authGet('/codec/decode/get')
	}

	async setDiscoveryServer(server) {
		return await this.authPost('/codec/discovery/setDiscoveryServer', { server })
	}

	async getDiscoveryServer() {
		return await this.authGet('/codec/discovery/getDiscoveryServer')
	}

	async setDiscoveryGroupChannel(group, channel) {
		return await this.authPost('/codec/discovery/setDiscoveryGroupChannel', { group, channel })
	}

	async getDiscoveryGroupChannel() {
		return await this.authGet('/codec/discovery/getDiscoveryGroupChannel')
	}

	async addManualIpsGroups(name, ips) {
		return await this.authPost('/codec/discovery/addManualIpsGroups', { name, ips })
	}

	async getManualIpsGroups() {
		return await this.authGet('/codec/discovery/getManualIpsGroups')
	}

	async getNetStream() {
		return await this.authGet('/codec/net_stream')
	}

	async setNetStream(params) {
		return await this.authPost('/codec/net_stream', params)
	}

	async getPreset() {
		return await this.authGet('/codec/preset/get')
	}

	async addPreset(params) {
		return await this.authPost('/codec/preset/add', params)
	}

	async addNetStreamPreset(params) {
		return await this.authPost('/codec/preset/add_net_stream', params)
	}

	async removePreset(id) {
		return await this.authPost('/codec/preset/remove', { id })
	}

	async setBlankColor(color) {
		return await this.authPost('/codec/preset/set_blank_color', { color })
	}

	/**
	 * get output settings from info
	 */
	getOutputSettings(info) {
		return {
			"output_resolution": info?.data?.output_resolution_choose,
			"output_framerate": info?.data?.output_framerate,
			"audio_format": info?.data?.audio_format,
			"hdmi_channels": info?.data?.hdmi_channels,
			"videoSource":"hdmi",
			"hdmi_channels_mapping": info?.data?.hdmi_channels_mapping,
			"line_out_channels": info?.data?.line_out_channels,
			"line_out_channels_mapping": info?.data?.line_out_channels_mapping,
			"hdcp": info?.data?.hdcp,
			"out_colorspace": info?.data?.out_colorspace,
			"output_bitdepth_mode": info?.data?.output_bitdepth_mode,
		}
	}

	async setOutputResolution(info, resolution) {
		if(info == null){
			this.log('error', 'setOutputResolution info is null')
			return {result: 'failed'}
		}

		info.output_resolution = resolution
		return await this.authPost('/codec/decode/output_set', info)
	}

	async setOutputFrameRate(info, frame_rate) {
		if(info == null){
			this.log('error', 'setOutputFrameRate info is null')
			return {result: 'failed'}
		}

		info.output_framerate = frame_rate
		return await this.authPost('/codec/decode/output_set', info)
	}



	async reboot() {
		return await this.authGet('/systemctrl/system/reboot')
	}

}

module.exports = kiloviewNDI
