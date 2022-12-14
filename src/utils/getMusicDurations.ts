import { logger } from "@utils/logger";
import childProcess from "child_process";
import { once } from "events";

async function getMusicDuration(musicPath: string): Promise<number> {
  const args = [
    "-v",
    "error",
    "-show_entries",
    "format=duration",
    "-of",
    "default=noprint_wrappers=1:nokey=1",
    musicPath,
  ];

  const { stderr, stdout } = childProcess.spawn("ffprobe", args);

  await Promise.all([once(stderr, "readable"), once(stdout, "readable")]);

  const [success, error] = [stdout, stderr].map((stream) => stream.read());

  if (error) {
    logger.error(
      `Error when trying to catch music duration: ${error.toString()}`
    );
    throw new Error("Internal Error");
  }

  return Math.floor(Number(success.toString()));
}

export { getMusicDuration };
