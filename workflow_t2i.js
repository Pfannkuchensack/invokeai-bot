
let batch = {
  batch: {
    graph: {
      id: "7a36588a-9e6b-430b-8107-d627ff07889d",
      nodes: {
        "93dc02a4-d05b-48ed-b99c-c9b616af3402": {
          type: "compel",
          id: "93dc02a4-d05b-48ed-b99c-c9b616af3402",
          prompt: "<FastNegativeEmbedding>",
          use_cache: true,
          is_intermediate: true,
        },
        "55705012-79b9-4aac-9f26-c0b10309785b": {
          type: "noise",
          id: "55705012-79b9-4aac-9f26-c0b10309785b",
          width: 512,
          height: 512,
          use_cpu: true,
          use_cache: true,
          is_intermediate: true,
        },
        "c8d55139-f380-4695-b7f2-8b3d1e1e3db8": {
          type: "main_model_loader",
          id: "c8d55139-f380-4695-b7f2-8b3d1e1e3db8",
          model: {
            key: "d9fd029f-bc93-4cfa-8dfb-111637c6bbf6",
            hash: "blake3:4b394e9f74f765b8b1518a9d3571827967c84f5e8dd3b1a7497c551eec696d7a",
            name: "stable-diffusion-v1-5",
            base: "sd-1",
            type: "main",
          },
          use_cache: true,
          is_intermediate: true,
        },
        "7d8bf987-284f-413a-b2fd-d825445a5d6c": {
          type: "compel",
          id: "7d8bf987-284f-413a-b2fd-d825445a5d6c",
          prompt:
            "Super cute tiger cub, national geographic award-winning photograph",
          use_cache: true,
          is_intermediate: true,
        },
        "ea94bc37-d995-4a83-aa99-4af42479f2f2": {
          type: "rand_int",
          id: "ea94bc37-d995-4a83-aa99-4af42479f2f2",
          low: 0,
          high: 2147483647,
          use_cache: false,
          is_intermediate: true,
        },
        "eea2702a-19fb-45b5-9d75-56b4211ec03c": {
          type: "denoise_latents",
          id: "eea2702a-19fb-45b5-9d75-56b4211ec03c",
          steps: 30,
          cfg_scale: 7.5,
          denoising_start: 0,
          denoising_end: 1,
          scheduler: "euler",
          cfg_rescale_multiplier: 0,
          use_cache: true,
          is_intermediate: true,
        },
        "58c957f5-0d01-41fc-a803-b2bbf0413d4f": {
          type: "l2i",
          id: "58c957f5-0d01-41fc-a803-b2bbf0413d4f",
          board: { board_id: "7372d224-10af-4998-8cb4-d0990f0cec25" },
          tiled: false,
          fp32: true,
          use_cache: true,
          is_intermediate: false,
        },
        "c628d129-dc01-4e13-970d-8b4516e4c854": {
          type: "vae_loader",
          id: "c628d129-dc01-4e13-970d-8b4516e4c854",
          vae_model: {
            key: "9834981e-d5b0-4a5e-a371-5841572515ae",
            hash: "blake3:9d45b518badb197eed2ef14c08d27e2cfe28626a6f9ea99455cba8f348ceffb7",
            name: "1.5 vae",
            base: "sd-1",
            type: "vae",
          },
          use_cache: true,
          is_intermediate: true,
        },
      },
      edges: [
        {
          source: {
            node_id: "ea94bc37-d995-4a83-aa99-4af42479f2f2",
            field: "value",
          },
          destination: {
            node_id: "55705012-79b9-4aac-9f26-c0b10309785b",
            field: "seed",
          },
        },
        {
          source: {
            node_id: "c8d55139-f380-4695-b7f2-8b3d1e1e3db8",
            field: "clip",
          },
          destination: {
            node_id: "7d8bf987-284f-413a-b2fd-d825445a5d6c",
            field: "clip",
          },
        },
        {
          source: {
            node_id: "c8d55139-f380-4695-b7f2-8b3d1e1e3db8",
            field: "clip",
          },
          destination: {
            node_id: "93dc02a4-d05b-48ed-b99c-c9b616af3402",
            field: "clip",
          },
        },
        {
          source: {
            node_id: "55705012-79b9-4aac-9f26-c0b10309785b",
            field: "noise",
          },
          destination: {
            node_id: "eea2702a-19fb-45b5-9d75-56b4211ec03c",
            field: "noise",
          },
        },
        {
          source: {
            node_id: "7d8bf987-284f-413a-b2fd-d825445a5d6c",
            field: "conditioning",
          },
          destination: {
            node_id: "eea2702a-19fb-45b5-9d75-56b4211ec03c",
            field: "positive_conditioning",
          },
        },
        {
          source: {
            node_id: "93dc02a4-d05b-48ed-b99c-c9b616af3402",
            field: "conditioning",
          },
          destination: {
            node_id: "eea2702a-19fb-45b5-9d75-56b4211ec03c",
            field: "negative_conditioning",
          },
        },
        {
          source: {
            node_id: "c8d55139-f380-4695-b7f2-8b3d1e1e3db8",
            field: "unet",
          },
          destination: {
            node_id: "eea2702a-19fb-45b5-9d75-56b4211ec03c",
            field: "unet",
          },
        },
        {
          source: {
            node_id: "eea2702a-19fb-45b5-9d75-56b4211ec03c",
            field: "latents",
          },
          destination: {
            node_id: "58c957f5-0d01-41fc-a803-b2bbf0413d4f",
            field: "latents",
          },
        },
        {
          source: {
            node_id: "c628d129-dc01-4e13-970d-8b4516e4c854",
            field: "vae",
          },
          destination: {
            node_id: "58c957f5-0d01-41fc-a803-b2bbf0413d4f",
            field: "vae",
          },
        },
      ],
    },
    runs: 1,
  },
  prepend: false,
};


export default batch;