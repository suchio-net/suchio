"""Build the site's Google Sans Flex files from the full Fontsource files.

Fontsource has no file with both optical size and rounding, and its full files are 1.4 MB.
This keeps the optical size axis and the weights in use, and fixes rounding at 100.

Run: python -m pip install fonttools brotli
     python scripts/fonts/build-google-sans-flex.py
"""

from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

SOURCE = "node_modules/@fontsource-variable/google-sans-flex/files/google-sans-flex-{}-full-normal.woff2"
TARGET = "src/assets/fonts/google-sans-flex-{}-rounded.woff2"
LIMITS = {"wdth": 100, "slnt": 0, "GRAD": 0, "ROND": 100, "wght": (300, 800)}

for subset in ("latin", "latin-ext"):
    font = instantiateVariableFont(TTFont(SOURCE.format(subset)), LIMITS)
    font.flavor = "woff2"
    font.save(TARGET.format(subset))
    print(subset, [(axis.axisTag, axis.minValue, axis.maxValue) for axis in font["fvar"].axes])
