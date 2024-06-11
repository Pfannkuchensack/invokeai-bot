import { TeamSpeak, TeamSpeakClient } from "ts3-nodejs-library";
import { t2i } from "./t2i.js";
import { upscalex2 } from "./upscalex2.js";

const teamspeak = new TeamSpeak({
  host: process.env.ts3host,
  queryport: process.env.ts3queryport,
  serverport: process.env.ts3serverport,
  nickname: process.env.ts3nickname,
});

teamspeak.on("ready", () => {
  //teamspeak connected successfully
  console.log("Connected to TS3 server");

  teamspeak.getChannelById("2059").then((channel) => {
    channel.message("Bot ist online!");
  });
  teamspeak.on("clientmoved", (ev) => {
    console.log(ev.client.nickname + " " + ev.channel.name);
    if (ev.channel.name != process.env.ts3channelname) return;
    if (ev.client.nickname == process.env.ts3nickname) return;
    ev.client.message(
      "Hallo, ich bin der Invoker Bot. Wie kann ich dir helfen?"
    );
    ev.client.message("Ich kann dir folgende Befehle ausführen:");
    ev.client.message("!image <prompt>");
	ev.client.message("Command: !image gibt dir ein 512x512 Bild zurück mit dem gegebenen Prompt.");
	ev.client.message("!workflow <prompt>");
	ev.client.message("Command: !workflow gibt dir ein 1280x720 Bild zurück mit dem gegebenen Prompt.");
    //ev.client.message("!help");
  });
  teamspeak.on("textmessage", (ev) => {
	// !image <prompt> // t2i
	if(ev.invoker.nickname == process.env.ts3nickname) return;
    if (ev.msg.startsWith("!image")) {
      let prompt = {
        positive: ev.msg.slice(7),
        negative: "<FastNegativeEmbedding>",
      };
      let config = {
        steps: 25,
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
	  t2i(config, prompt).then((imageurl) => {
		ev.invoker.message("Hier ist dein Image: " + imageurl);
		console.log(imageurl + " " + ev.invoker.nickname + " " + prompt.positive);
	  });
    }
	// !workflow <prompt> // upscalex2
	if (ev.msg.startsWith("!workflow")) {
	  let prompt = {
		positive: ev.msg.slice(10),
	  };
	  let config = {
	  };
	  upscalex2(config, prompt).then((imageurl) => {
		ev.invoker.message("Hier ist dein Image: " + imageurl);
		console.log(imageurl + " " + ev.invoker.nickname + " " + prompt.positive);
	  });
	}
  });
});

teamspeak.on("error", (error) => {
  //teamspeak had an error
  console.log(error);
});
