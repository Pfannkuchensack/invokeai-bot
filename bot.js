import io from "socket.io-client";
import batch from "./workflow_t2i.js";

const config = {
  steps: 50,
  iterations: 1,
  cfg: 7,
  model: "stable-diffusion-v1-5", // Liste der Models http://127.0.0.1:9090/api/v2/models/ // wird gerade nicht benutzt
  //seed: Math.floor(Math.random() * 1000000),
  rseed: false,
  width: 512,
  height: 512,
  clip: 0,
  scheduler: "euler",
};
const prompt = {
  positive: "A beautiful sunset over the city",
  negative: "<FastNegativeEmbedding>",
};
// Make a request to the REST URL
console.log('batch:', batch.batch.graph.nodes["7d8bf987-284f-413a-b2fd-d825445a5d6c"]["prompt"]);
batch.batch.graph.nodes["55705012-79b9-4aac-9f26-c0b10309785b"]["height"] = config.height;
batch.batch.graph.nodes["55705012-79b9-4aac-9f26-c0b10309785b"]["width"] = config.width;
batch.batch.graph.nodes["7d8bf987-284f-413a-b2fd-d825445a5d6c"]["prompt"] = prompt.positive;
batch.batch.graph.nodes["93dc02a4-d05b-48ed-b99c-c9b616af3402"]["prompt"] = prompt.negative;
batch.batch.graph.nodes["eea2702a-19fb-45b5-9d75-56b4211ec03c"]["steps"] = config.steps;
batch.batch.graph.nodes["eea2702a-19fb-45b5-9d75-56b4211ec03c"]["cfg_scale"] = config.cfg;
batch.batch.graph.nodes["eea2702a-19fb-45b5-9d75-56b4211ec03c"]["scheduler"] = config.scheduler;
fetch("http://127.0.0.1:9090/api/v1/queue/bot_queue/enqueue_batch", {
  method: "POST",
  // ignore cors
  //mode: 'no-cors',
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(batch),
})
  .then((response) => response.json())
  .then((data) => {
    console.log('data:', data);
    const socket = io(`ws://127.0.0.1:9090`, {
      transports: ["websocket"],
      path: "/ws/socket.io/",
    });
	// Subscribe to the queue
	socket.emit('subscribe_queue', { 'queue_id': 'bot_queue'});

	socket.on('queue_item_status_changed', (result) => {
		if(result.queue_item.status == 'completed')
		{
			console.log('Request complete:', result);
			fetch('http://127.0.0.1:9090/api/v1/boards/7372d224-10af-4998-8cb4-d0990f0cec25/image_names').then(response => response.json()).then(data => {
				console.log('Image URL:', data);
				// all images upload to some service
				data.forEach(element => {
					// 
					fetch('http://127.0.0.1:9090/api/v1/images/i/' + element + '/full').then(response => response.blob()).then(blob => {
						const file = new File([blob], 'image.png', {type: blob.type});
						// save file
						console.log('File:', file);
					});
				});
			});
			// upload the image to whatever service you want
			// for now, we'll just log the URL
			
		}

	});
  });
