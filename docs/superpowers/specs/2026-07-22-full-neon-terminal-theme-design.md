# Full Neon Terminal Theme Design

## Goal

Solution PE팀 Staff 대상 73장 워크숍 덱 전체를 강한 Neon Terminal 테마로 통일한다. 콘텐츠, 120분 시간표, 슬라이드 순서, 발표자 노트는 바꾸지 않는다.

## Visual system

- Background: terminal black `#050807` with a subtle green/cyan grid on every slide.
- Primary accents: neon green `#5CFF95`, neon cyan `#44D9FF`, alert red `#FF6B7A`.
- Text: terminal ink `#EAFFF1`; secondary text uses muted green `#8AA89A`.
- Typography: JetBrains Mono for headings, labels, commands, and utility text; Pretendard remains the Korean body fallback for readability.
- Surfaces: dark green translucent panels, thin cyan borders, 3–4px corners, and no generic soft card styling.
- Signature: every slide carries the terminal status rail `context → skill → evidence ▋` at the bottom.

## Component treatment

- Apply the existing skill-slide grid, palette, panels, tags, code, and status rail to every slide through shared `.slide` rules.
- Preserve semantic colors: green for success/evidence, red for failure/risk, cyan for guidance and metadata.
- Convert opening browser mock, agenda, comparison panels, STEP lab slides, break, and closing into the same terminal grammar without changing their information hierarchy.
- Keep skill badges and skill comparison slides more explicit through their existing badge and compare treatments; they remain distinct by content rather than by a separate page theme.

## Responsive and print behavior

- Maintain the current desktop 1440×900 and mobile 390×844 layouts.
- Keep inactive-slide accessibility state, keyboard/touch navigation, notes popup, and fullscreen behavior unchanged.
- Preserve vertical scrolling where a mobile slide is intentionally taller, while preventing horizontal overflow and ghost slides.
- Force exact background and foreground colors in print so the 73-page PDF retains the Neon Terminal identity.
- Respect reduced-motion preferences by suppressing non-essential transitions.

## Verification contract

- Add a test first that requires all 73 slides to receive the global Neon Terminal treatment and rejects a Minimal Dark fallback.
- Preserve 73 slides, 120 minutes, and exact 73-section presenter-note parity.
- Run the focused and full Node test suites plus `git diff --check`.
- Re-render all 73 desktop slides, the established mobile risk set plus representative opening/lab/closing slides, and a 73-page PDF.
- Inspect overflow, overlap, contrast, navigation, notes, and served-file SHA before completion.

## Publishing

- Publish the verified deck to the existing `wys1110/claude-code-part-training` GitHub repository.
- Preserve the repository's existing root deck and unrelated files; expose this workshop through a stable Pages path rather than replacing unrelated content without review.
- Push the feature branch and use the repository's normal PR/merge workflow when direct branch publication is not already configured.
- Verify the final public GitHub Pages URL with HTTP status, page title, slide count, and representative navigation before reporting deployment complete.

## Non-goals

- No content rewrite, slide insertion/removal, timing changes, new interaction, or external asset.
- No changes to the original root deck or unrelated dirty files.
