/**
 * Simplex Noise & PRNG Utility
 */

class Random {
    constructor(seed) {
        this.seed = seed;
    }

    // Mulberry32 PRNG
    next() {
        var t = this.seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }

    range(min, max) {
        return min + this.next() * (max - min);
    }
}

class Noise {
    constructor(seed) {
        this.rand = new Random(seed);
        this.p = new Uint8Array(256);
        for (let i = 0; i < 256; i++) this.p[i] = i;
        for (let i = 255; i > 0; i--) {
            const r = Math.floor(this.rand.next() * (i + 1));
            [this.p[i], this.p[r]] = [this.p[r], this.p[i]];
        }
        this.perm = new Uint8Array(512);
        for (let i = 0; i < 512; i++) this.perm[i] = this.p[i & 255];
    }

    fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
    lerp(t, a, b) { return a + t * (b - a); }
    grad(hash, x, y, z) {
        const h = hash & 15;
        const u = h < 8 ? x : y;
        const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }

    perlin(x, y, z = 0) {
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        const Z = Math.floor(z) & 255;

        x -= Math.floor(x);
        y -= Math.floor(y);
        z -= Math.floor(z);

        const u = this.fade(x);
        const v = this.fade(y);
        const w = this.fade(z);

        const p = this.perm;
        const A = p[X] + Y, AA = p[A] + Z, AB = p[A + 1] + Z;
        const B = p[X + 1] + Y, BA = p[B] + Z, BB = p[B + 1] + Z;

        return this.lerp(w, this.lerp(v, this.lerp(u, this.grad(p[AA], x, y, z),
            this.grad(p[BA], x - 1, y, z)),
            this.lerp(u, this.grad(p[AB], x, y - 1, z),
                this.grad(p[BB], x - 1, y - 1, z))),
            this.lerp(v, this.lerp(u, this.grad(p[AA + 1], x, y, z - 1),
                this.grad(p[BA + 1], x - 1, y, z - 1)),
                this.lerp(u, this.grad(p[AB + 1], x, y - 1, z - 1),
                    this.grad(p[BB + 1], x - 1, y - 1, z - 1))));
    }

    fbm(x, y, octaves = 4, persistence = 0.5) {
        let total = 0;
        let frequency = 1;
        let amplitude = 1;
        let maxValue = 0;
        for (let i = 0; i < octaves; i++) {
            total += this.perlin(x * frequency, y * frequency) * amplitude;
            maxValue += amplitude;
            amplitude *= persistence;
            frequency *= 2;
        }
        return total / maxValue;
    }
}

window.Random = Random;
window.Noise = Noise;
