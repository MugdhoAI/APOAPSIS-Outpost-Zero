# Asset attribution

## Footage, screens, and end card

All footage shows the APOAPSIS build of Outpost Zero. It was captured from the local production
build and contains no third party video, photography, or stock footage.

The outpost artwork on the title screen and the site schematic in the briefing are SVG drawings
made for this project. They are labelled in the game as illustrations, not NASA imagery. The end
card is an HTML page in `video/tools/endcard.html`, rendered to a PNG.

## Music and sound

None. The exported file carries a silent audio track so players and platforms handle it predictably.

## Fonts

The interface and captions use fonts already installed on the recording machine: Segoe UI through
the system font stack, and Segoe UI Bold for burned in captions. Inter is named first in the CSS
font stack because the design tokens list it, and it is not redistributed with the project. No font
files are committed.

## Sources named on screen

The video shows two source labels that appear inside the game: a LOLA illumination data note
(Data-derived context) and a NASA space radiation note (NASA fact). Both point at the entries in
`app/src/data/sources.ts`. No NASA logo, insignia, or imagery is used, and the video states that the
project is not affiliated with NASA.
