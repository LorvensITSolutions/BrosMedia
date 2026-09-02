/** Minimal shim so Framer marketplace components run outside Framer. */
export function addPropertyControls() {}

export const ControlType = {
  Array: 'array',
  Object: 'object',
  Enum: 'enum',
  Image: 'image',
  Boolean: 'boolean',
  File: 'file',
  String: 'string',
  Link: 'link',
  Number: 'number',
  Color: 'color',
  Font: 'font',
}

export function useIsStaticRenderer() {
  return false
}
