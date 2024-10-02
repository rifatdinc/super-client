
import os from 'os';
import { execSync } from 'child_process';
import { ComputerStatus } from '../enum/computer.enum.js';

export class ComputerService {
	getMacAddress() {
		let macAddress = "";
		let networkInterfaces = os.networkInterfaces();

		networkInterfaces.Ethernet.map((item)=>	{
			if (item.family === "IPv4" && item.internal === false) {
				macAddress = item.mac;
			}
		}
		);


		return macAddress;
	}

	getIpAddress() {
		let ipAddress = "";
		let networkInterfaces = os.networkInterfaces();

		Object.keys(networkInterfaces).forEach((key) => {
			networkInterfaces[key]?.forEach((item) => {
				if (item.family === "IPv4" && item.internal === false) {
					ipAddress = item.address;
				}
			});
		});

		return ipAddress;
	}
	osInfo() {
		if (os.platform() === "win32") {
			return {
				os: os.platform(),
				uuid: this.uniqueId(),
				title: "",
				status: ComputerStatus.OFFLINE,
				type: "Standard",
				floor: 0,
				ipAddress: this.getIpAddress(),
				macAddress: this.getMacAddress(),
				userId: 1,
				lastMaintenance: new Date(),
				price: 0,
				hardWareSpecs: JSON.stringify({
					cpu: os.cpus(),
					ram: os.totalmem(),
					ramFree: os.freemem(),
					osUptime: os.uptime(),
					osVersion: os.version(),
					osRelease: os.release(),
					osType: os.type(),
					osArch: os.arch(),
					osHostname: os.hostname(),
					osTmpdir: os.tmpdir(),
					osUserInfo: os.userInfo(),
				} ),
				sessionStart: new Date(),
				sessionEnd: "",
				isOccupied: false,
				powerStatus: true,
				notes: " The computer is in good condition",
			};
		};
	};

	uniqueId = () => {
		try {
			const buffer = execSync('wmic csproduct get uuid'); // Add "csproduct" to your dictionary to avoid the spelling error
			const uuid = buffer.toString().split('\n')[1].trim();
			return uuid;
		} catch (error) {
			return "unknown";
		}
	};

}



