// Base‑34 alphabet
const C34 = "23456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// ------------------------------------------------------------
// ConvertToBase34
// ------------------------------------------------------------
function ConvertToBase34(n) {
    let R = "";
    while (n > 0) {
        const M = n % 34;
        R = C34[M] + R;
        n = Math.floor(n / 34);
    }
    // Pad to 4 chars with "2"
    return ("2222" + R).slice(-4);
}

// ------------------------------------------------------------
// MakeLocationsCode
// ------------------------------------------------------------
function MakeLocationsCode(a, b) {

    // Normalize input (comma → dot)
    const lat = parseFloat(String(a).replace(",", "."));
    const lon = parseFloat(String(b).replace(",", "."));

    // Range validation
    if (lat < -90 || lat > 90) {
        throw new Error(`Latitude out of range (-90 to +90): ${lat}`);
    }
    if (lon < -180 || lon > 180) {
        throw new Error(`Longitude out of range (-180 to +180): ${lon}`);
    }

    // Convert to arc-seconds and encode
    const A4 = ConvertToBase34(Math.round((lat + 90) * 3600));
    const B4 = ConvertToBase34(Math.round((lon + 180) * 3600));

    // Interleave A0 B0 A1 B1 A2 B2 A3 B3
    let O = Array(8).fill(" ");
    for (let i = 0; i < 4; i++) {
        O[2 * i]     = A4[i];
        O[2 * i + 1] = B4[i];
    }

    return O.slice(0, 4).join("") + "-" + O.slice(4).join("");
}

// ------------------------------------------------------------
// ConvertFromBase34
// ------------------------------------------------------------
function ConvertFromBase34(s) {
    let value = 0;

    for (let i = 0; i < s.length; i++) {
        const pos = C34.indexOf(s[i]);
        if (pos === -1) {
            throw new Error(`Invalid character in Locations Code: ${s}`);
        }
        value = value * 34 + pos;
    }

    return value;
}

// ------------------------------------------------------------
// LatFromCode
// ------------------------------------------------------------
function LatFromCode(code, digit) {
    const clean = code.replace("-", "");
    const A4 = clean[0] + clean[2] + clean[4] + clean[6];
    const arcsec = ConvertFromBase34(A4);
    return Number(((arcsec / 3600) - 90).toFixed(digit));
}

// ------------------------------------------------------------
// LngFromCode
// ------------------------------------------------------------
function LngFromCode(code, digit) {
    const clean = code.replace("-", "");
    const B4 = clean[1] + clean[3] + clean[5] + clean[7];
    const arcsec = ConvertFromBase34(B4);
    return Number(((arcsec / 3600) - 180).toFixed(digit));
}
