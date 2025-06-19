export default function (source) {
  // so... basically this loader is used to prepend the "use client" directive
  // forcefully to say the least...
  // this is necessary for next.js to recognize the following modules are
  // client components
  if (
    !source.startsWith('"use client"') &&
    !source.startsWith("'use client'")
  ) {
    return '"use client";\n' + source;
  }
  return source;
}
