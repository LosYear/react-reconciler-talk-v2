const hexToRgb = (hex: string) =>
    hex
        .replace(
            /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
            (m, r, g, b) => '#' + r + r + g + g + b + b
        )
        ?.substring(1)
        ?.match(/.{2}/g)
        ?.map((x) => parseInt(x, 16) / 255);

export const backgroundColorAssign = (
    node: GeometryMixin,
    backgroundColor: string
) => {
    const rgb = hexToRgb(backgroundColor);

    if (rgb) {
        node.fills = [
            { type: 'SOLID', color: { r: rgb[0], g: rgb[1], b: rgb[2] } },
        ];
    }
};
