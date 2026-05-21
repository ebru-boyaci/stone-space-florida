#!/usr/bin/env python3
"""One-off: download reference gallery images from stonespaces.com/referance (Wix CDN)."""
import re
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "references"
HTML_PATH = Path("/tmp/referance.html")

SKIP = {
    "66e54c_e7b83928d78c4372acf5f94fe17e0a4c~mv2.png",
    "66e54c_cf612c58ddaa4488bb87c37f7c27ada6~mv2.png",
}


def main() -> None:
    html = HTML_PATH.read_text(encoding="utf-8", errors="ignore")
    bases = set()
    for m in re.finditer(
        r"((?:66e54c|ebb2fe)_[a-f0-9]+)(?:%7E|~)(mv2\.(?:jpg|jpeg|png|webp))",
        html,
        re.I,
    ):
        file_id = f"{m.group(1)}~{m.group(2)}"
        if file_id not in SKIP:
            bases.add(file_id)

    ordered = sorted(bases)
    OUT.mkdir(parents=True, exist_ok=True)

    lines: list[str] = []
    for i, file_id in enumerate(ordered, start=1):
        ext = file_id.rsplit(".", 1)[-1].lower()
        out_name = f"reference-{i:02d}.{ext}"
        out_path = OUT / out_name
        url = (
            f"https://static.wixstatic.com/media/{file_id}"
            f"/v1/fit/w_1400,h_1400,al_c,q_90/file.{ext}"
        )
        print(f"Downloading {out_name}...")
        urllib.request.urlretrieve(url, out_path)
        lines.append(f'import img{i:02d} from "@assets/references/{out_name}";')

    ts_path = ROOT / "src" / "data" / "references.ts"
    imports = "\n".join(lines)
    exports = ",\n  ".join(f"img{n:02d}" for n in range(1, len(ordered) + 1))
    ts_path.write_text(
        f"""{imports}

export const REFERENCE_IMAGES: string[] = [
  {exports},
];
""",
        encoding="utf-8",
    )
    print(f"Saved {len(ordered)} images → {OUT}")
    print(f"Wrote {ts_path}")


if __name__ == "__main__":
    main()
