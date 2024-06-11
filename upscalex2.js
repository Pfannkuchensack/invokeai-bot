import io from "socket.io-client";
import batch from "./workflow_upscalex2.js";
import dotenv from "dotenv";

async function upscalex2(config, prompt) {
return new Promise((resolve, reject) => {
  let imgurl = "";
  dotenv.config();
  batch.batch.graph.nodes["aba5da58-d7f0-4933-b113-3c32175ab596"]["value"] =
    prompt.positive;
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
      //console.log("data:", data);
      const socket = io(`ws://127.0.0.1:9090`, {
        transports: ["websocket"],
        path: "/ws/socket.io/",
      });
      // Subscribe to the queue
      socket.emit("subscribe_queue", { queue_id: "bot_queue" });

      socket.on("queue_item_status_changed", (result) => {
        if (result.queue_item.status == "completed") {
          //console.log("Request complete:", result);
          fetch(
            "http://127.0.0.1:9090/api/v1/boards/7372d224-10af-4998-8cb4-d0990f0cec25/image_names"
          )
            .then((response) => response.json())
            .then((data) => {
              console.log("Image URL:", data);
              // all images upload to some service
              data.forEach((element) => {
                fetch(
                  "http://127.0.0.1:9090/api/v1/images/i/" + element + "/full"
                )
                  .then((response) => response.blob())
                  .then((blob) => {
                    const file = new File([blob], "image.png", {
                      type: blob.type,
                    });
                    // save file
                    //console.log('File:', file);
                    // upload file to push.jetzt
                    const formData = new FormData();
                    formData.append("file", file);
                    // pushjetzttoken out of .env
                    formData.append("token", process.env.pushjetzttoken);
                    fetch("https://push.jetzt/upload", {
                      method: "POST",
                      body: formData,
                    })
                      .then((response) => response.json())
                      .then((dataR) => {
                        //console.log("Upload:", data);
                        // data.url is the URL of the image
                        // delete file from invoke
                        fetch(
                          "http://127.0.0.1:9090/api/v1/images/i/" + element,
                          {
                            method: "DELETE",
                          }
                        )
                          .then((response) => response.json())
                          .then((data2) => {
                            //console.log("Delete:", data);
                            // new we can return the url to the user
                            imgurl = dataR.url;
							//return imgurl;
							// remove socket listener
							socket.off("queue_item_status_changed");
							resolve(imgurl)
                            //return data.url;
                          });
                      });
                  });
              });
            });
          // upload the image to whatever service you want
          // for now, we'll just log the URL
        }
      });
    });
});
  //await new Promise((resolve) => setTimeout(resolve, 10000));
}

//module.exports.invokeImage = invokeImage;
export { upscalex2 };