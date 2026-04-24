# Kiloview 4K NDI Converter

This module will allow you to control Kiloview 4K NDI Converter devices (N50/N60/FN-50/FN-60). Supports both Encoder and Decoder modes with full API integration.

## Configuration

- **Device IP / Host** — Enter the IP address or hostname of the device
- **Protocol** — HTTP (port: 80) or HTTPS (port: 443)
- **Port** — Connection port (auto-defaults to 80 for HTTP, 443 for HTTPS)
- **Use Authentication** — Enable/disable login credentials
- **Username / Password** — Device login credentials (default: admin/admin)
- **Default Mode** — Initial converter mode selection (Encoder/Decoder)
- **Enable Polling** — Enable polling for feedbacks and variables (recommended: enabled)
- **Polling Rates** — Configurable intervals for state and NDI source polling
- **Verbose Logging** — Enable debug-level logging for troubleshooting

## Actions

### General Actions (All Modes)
- **Set Mode** — Switch between Encoder and Decoder mode
- **Toggle Mode** — Toggle between Encoder and Decoder mode
- **Refresh Device Status** — Manually trigger a status refresh
- **Reboot Device** — Reboot the Kiloview device
- **Reset All NDI Connections** — Reset all active NDI connections

### Encoder Actions
- **Choose Encode Mode** — Select encoding mode (HB+HX, HB+Net, HB+Rec, HB Only, HX Only, Net Only)
- **Set NDI FULL Color Format** — Set NDI HB stream color format (Auto, YCbCr 4:2:0, YCbCr 4:2:2)
- **Set NDI FULL Color Depth** — Set NDI HB stream color depth (8bit, 10bit)
- **Set NDI HX Color Format** — Set NDI HX stream color format
- **Set NDI HX Color Depth** — Set NDI HX stream color depth
- **Set NDI HX Codec** — Set NDI HX codec (H264, H265)
- **Set Net Stream Color Format** — Set multi-protocol stream color format
- **Set Net Stream Color Depth** — Set multi-protocol stream color depth
- **Set Net Stream Codec** — Set multi-protocol stream codec (H264, H265)
- **Set Net Stream Parameters** — Enable/disable net stream protocols (RTMP, HLS, UDP, RTP, SRT, RTSP)

### Decoder Actions
- **Set Preset** — Switch to a specific preset (1-9 or Blank)
- **Select NDI Source** — Select from discovered NDI sources
- **Refresh NDI Sources** — Manually refresh the list of available NDI sources
- **Output with Blank** — Output blank video (Preset 0)
- **Set Output Resolution** — Set output resolution (Auto, Deinterlaced/Progressive)
- **Set Output Frame Rate** — Set output frame rate (Auto, 23.98-60 fps)
- **Add NDI Preset** — Add a new NDI preset (ID 1-9) with Name, Group, Channel Name
- **Add Net Stream Preset** — Add a new net stream preset (ID 1-9) with Name, Protocol, URL
- **Remove Preset** — Remove an existing preset by ID (1-9)
- **Set Blank Color** — Set the blank output color (hex value, e.g., #000000)
- **Set Discovery Server** — Configure NDI discovery server address
- **Set Discovery Group/Channel** — Set NDI discovery group and channel filters
- **Add Manual NDI Source** — Manually add NDI sources by name and IP addresses

## Feedbacks

### General Feedbacks (All Modes)
- **Converter Mode** — Change button color when current mode matches selected mode (Encoder/Decoder)

### Encoder Feedbacks
- **Encode Mode** — Change button color when encode mode matches
- **NDI FULL Color Format** — Change button color based on HB stream color format
- **NDI FULL Color Depth** — Change button color based on HB stream color depth
- **NDI HX Color Format** — Change button color based on HX stream color format
- **NDI HX Color Depth** — Change button color based on HX stream color depth
- **NDI HX Codec** — Change button color based on HX codec (H264/H265)
- **Net Stream Color Format** — Change button color based on net stream color format
- **Net Stream Color Depth** — Change button color based on net stream color depth
- **Net Stream Codec** — Change button color based on net stream codec
- **Encoder Video Signal is Online/Offline** — Change color based on input video signal presence
- **Encoder Audio Source is Online/Offline** — Change color based on input audio signal presence
- **NDI HB Stream Started** — Green when HB stream is actively running
- **NDI HX Stream Started** — Green when HX stream is actively running
- **Net Stream Started** — Green when net stream is actively running

### Decoder Feedbacks
- **Selected NDI Source is Online/Offline** — Change color based on current NDI source connection status
- **Selected Preset is Enabled** — Change color when specified preset is enabled
- **Selected Preset is Current Preset** — Change color when specified preset is the active one
- **Output Resolution is Current Resolution** — Change color when resolution matches current output
- **Output Frame Rate is Current Frame Rate** — Change color when frame rate matches current output

## Variables

### Common Variables (All Modes)
- **Current Converter Mode** — Encoder or Decoder
- **Authorized User** — Currently logged-in user alias
- **Device Hostname** — Device hostname
- **Resolution** — Current video resolution
- **Audio Format** — Current audio format info

### Encoder Variables
- **Current Encode Mode** — Active encoding mode (e.g., HB+HX)
- **Current NDI FULL Color Format** — HB stream color format
- **Current NDI FULL Color Depth** — HB stream bit depth (8bit/10bit)
- **Current NDI HX Color Format** — HX stream color format
- **Current NDI HX Bit Depth** — HX stream bit depth (8bit/10bit)
- **Current NDI HX Codec** — HX codec (H264/H265)
- **Current Net Stream Color Format** — Multi-protocol stream color format
- **Current Net Stream Color Depth** — Multi-protocol stream bit depth (8bit/10bit)
- **Current Net Stream Codec** — Multi-protocol stream codec (H264/H265)
- **Video Signal Present** — Input video signal status (True/False)
- **Audio Signal Present** — Input audio signal status (True/False)
- **NDI Bitrate** — NDI target bitrate
- **GOP Length** — GOP length value
- **Profile** — Encoding profile
- **NDI HB/HX/Net Stream Started** — Stream started status (True/False)
- **NDI HB/HX/Net Group** — Stream group name
- **NDI HB/HX/Net Channel** — Stream channel name
- **NDI HB/HX/Net Connection** — Stream connection type
- **NDI HB/HX/Net Bitrate** — Per-stream bitrate in Mbps

### Decoder Variables
- **NDI Codec** — Current decoding codec
- **NDI Stream Name** — Current stream name
- **URL / IP Address** — Current source URL and IP
- **NDI Source Online** — Source online status (True/False)
- **Current Preset ID** — Active preset number
- **Sampling / Bitrate / Resolution / Color Depth / Aspect Ratio** — Stream technical parameters
- **Output Resolution / Frame Rate / Sample Rate** — Output parameters
- **Preset 1–10**: Each preset provides Enabled, Group, Name, Device Name, Channel Name, URL, IP, Online, and Current status variables

### System Info
- **CPU Usage** — CPU utilization percentage
- **Memory Used** — Used memory in KB
- **Memory Total** — Total memory in KB
- **Device Uptime** — Formatted uptime string (e.g., `5 Days 12:30:45`)

## Presets

### General Category
- **Set Converter Mode to Encoder / Decoder** — Mode switch buttons with mode feedback
- **Toggle Converter Mode** — Toggle mode button
- **Refresh Device Status** — Status refresh button
- **Reboot Device** — Reboot button
- **Display Current Mode / Hostname** — Info display buttons using variables

### Encoder Categories
- **Encoder** — Video/Audio signal status displays; Current encode mode display
- **Encoder NDI FULL** — Color Format, Color Depth, Bitrate displays + setting buttons for each option
- **Encoder NDI HX** — Color Format, Color Depth, Codec, Bitrate displays + setting buttons for each option
- **Encoder Net Stream** — Color Format, Color Depth, Codec, Bitrate displays + setting buttons for each option
- **Encoder Mode** — Encode mode selection buttons (HB+HX, HB+Net, HB+Rec, HB Only, HX Only, Net Only) with feedback

### Decoder Categories
- **Decoder** — Online state display; Preset 1–10 (P10 = Blank) selection buttons with current-preset feedback
- **Decoder Info** — Codec, Stream Name, Resolution, Frame Rate, Sample Rate, Bitrate, etc. info displays
- **Decoder Output Resolution** — Resolution (Auto/720p/1080p/4k) and Frame Rate (Auto/24-60fps) setting buttons with feedback
