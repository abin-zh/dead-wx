<template>
	<view>
		<!-- 按照试题要求完成 -->
		<view class="uni-common-mt">
			<view class="uni-form-item uni-column">
				<view class="title">主题</view>
				<input class="uni-input" placeholder="输入主题" :value="connection.topic" />
			</view>
			<button @click="createConnection" type="primary">连接</button>
			<!-- <button style="margin-top: 16px;" @click="createConnection" type="warn">断开连接</button> -->
		</view>
		<view class="msg_list">
			<text>消息列表</text>
			<things v-for="(item,index) in connection.msgs" :msg="item" />
		</view>
	</view>
</template>

<script setup>
	import things from '@/components/things.vue'
	import * as mqtt from 'mqtt/dist/mqtt.js';
	import {
		reactive,
		ref,
		onMounted
	} from "vue";

	// https://github.com/mqttjs/MQTT.js#qos
	const qosList = [0, 1, 2];
	let client = ref({
		connected: false
	});
	const receivedMessages = ref("");
	const subscribedSuccess = ref(false);
	const btnLoadingType = ref("");
	const retryTimes = ref(0);

	let protocal = "";
	//如你的链接是wss:则修改为wxs:,如果你的链接是ws:则修改为wx:
	// #ifdef H5
	protocal = "ws"
	// #endif
	// #ifdef MP-WEIXIN
	protocal = "wx"
	// #endif
	const msgs = reactive([]);
	const connection = reactive({
		// ws or wss
		protocol: protocal,
		host: "jqrjq.cn",
		// ws -> 8083; wss -> 8084
		port: 8083,
		clientId: "emqx_vue3_" + Math.random().toString(16).substring(2, 8),
		/**
		 * By default, EMQX allows clients to connect without authentication.
		 * https://docs.emqx.com/en/enterprise/v4.4/advanced/auth.html#anonymous-login
		 */
		username: "admin",
		password: "public",
		clean: true,
		connectTimeout: 30 * 1000, // ms
		reconnectPeriod: 4000, // ms
		topic:"envs",
		msgs:[]
		// for more options and details, please refer to https://github.com/mqttjs/MQTT.js#mqttclientstreambuilder-options
	});
	const handleOnReConnect = () => {
		retryTimes.value += 1;
		if (retryTimes.value > 5) {
			try {
				client.value.end();
				initData();
				console.log("connection maxReconnectTimes limit, stop retry");
			} catch (error) {
				console.log("handleOnReConnect catch error:", error);
			}
		}
	};
	const createConnection = () => {
		try {
			const {
				protocol,
				host,
				port,
				...options
			} = connection;
			const connectUrl = `${protocol}://${host}:${port}/mqtt`;

			/**
			 * if protocol is "ws", connectUrl = "ws://broker.emqx.io:8083/mqtt"
			 * if protocol is "wss", connectUrl = "wss://broker.emqx.io:8084/mqtt"
			 * 
			 * /mqtt: MQTT-WebSocket uniformly uses /path as the connection path,
			 * which should be specified when connecting, and the path used on EMQX is /mqtt.
			 * 
			 * for more details about "mqtt.connect" method & options,
			 * please refer to https://github.com/mqttjs/MQTT.js#mqttconnecturl-options
			 */
			client.value = mqtt.connect(connectUrl, options);

			if (client.value.on) {
				// https://github.com/mqttjs/MQTT.js#event-connect
				client.value.on("connect", () => {
					//连接时开启订阅
					const topic = connection.topic;
					const qos = 0;
					client.value.subscribe(topic, {
						qos
					}, (error, res) => {
						
					})
					
					
					btnLoadingType.value = "";
					console.log("connection successful");
				});

				// https://github.com/mqttjs/MQTT.js#event-reconnect
				client.value.on("reconnect", handleOnReConnect);

				// https://github.com/mqttjs/MQTT.js#event-error
				client.value.on("error", (error) => {
					console.log("connection error:", error);
				});

				// https://github.com/mqttjs/MQTT.js#event-message
				client.value.on("message", (topic, message) => {
					receivedMessages.value = receivedMessages.value.concat(
						message.toString()
					);
					const data = JSON.parse(message.toString());
					connection.msgs.push(data);
					console.log(`received message: ${message} from topic: ${topic}`);
				});
			}
		} catch (error) {
			console.log("mqtt.connect error:", error);
		}
	};

	onMounted(() => {
		createConnection();
	})
</script>

<style>
	
	.uni-input {
		height: 35px;
		padding: 4px 8px;
		background-color: #fff;
	}
	
	.title {
		font-weight: bold;
	}
	
	.cbox {
		display: flex;
		justify-content: space-between;
	}
	
	.cbox,
	.uni-input {
		margin-top: 8px;
		margin-bottom: 16px;
	}
	
	.cbox-label {
		margin-right: 8px;
	}
	
	.uri-text {
		color: rgb(66, 216, 133);
	}
	
	.btn-group {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 16px;
	}
	
	.btn-conn {
		background-color: #68e09d;
		color: #fff;
	}
	
	.btn-conn:active {
		background-color: #5bc589;
	}
	
	.btn-group button {
		width: 30%;
		font-weight: bold;
	}
	
	.state-text {
		display: flex;
		align-items: center;
		font-weight: bold;
	}
	
	.msg_list{
		margin-top: 16px;
		background-color: white;
		padding: 16px;
	}
	
	.msg_list text{
		padding: 4px;
		border-radius: 4px;
		background-color: #e3e3e3;
	}
	
	.msg_list p{
		margin-top: 8px;
	}
	
	uni-button {
		margin: 0;
	}
</style>