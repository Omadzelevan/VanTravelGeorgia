function serializeMeta(meta) {
  if (!meta) return {};
  try {
    return JSON.parse(JSON.stringify(meta));
  } catch {
    return { note: "unserializable_meta" };
  }
}

function log(level, message, meta) {
  const payload = {
    ts: new Date().toISOString(),
    level,
    message,
    ...serializeMeta(meta),
  };
  const line = JSON.stringify(payload);
  if (level === "error" || level === "warn") {
    console.error(line);
    return;
  }
  console.log(line);
}

export const logger = {
  info: (message, meta) => log("info", message, meta),
  warn: (message, meta) => log("warn", message, meta),
  error: (message, meta) => log("error", message, meta),
};
