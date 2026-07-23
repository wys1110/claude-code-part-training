(() => {
  'use strict';

  if (document.querySelector('[data-skill-detail]')) return;

  const expansions = [
    {
      targetSlide: '15', key: 'brainstorming', eyebrow: '01 · 요구사항 정리 · 실전',
      title: 'brainstorming은 네 질문으로 요구사항을 고정한다',
      html: '<div class="four-grid"><div class="panel"><h3>01 대상</h3><p>누가 이 결과를 보고 무엇을 이해해야 하는가?</p></div><div class="panel"><h3>02 핵심 결과</h3><p>한 페이지에서 반드시 보여 줄 내용은 무엇인가?</p></div><div class="panel"><h3>03 금지</h3><p>개인정보·비공개 자료·추측을 어디까지 제외할 것인가?</p></div><div class="panel"><h3>04 완료 기준</h3><p>화면·링크·모바일·Git에서 무엇을 직접 확인할 것인가?</p></div></div>',
      overviewNote: '[약 1분]\n\nbrainstorming의 역할은 바로 제작하는 것이 아니라 대상, 핵심 결과, 공개 금지 정보, 완료 기준을 질문으로 합의하는 것이라고 설명합니다. 기존 비교 화면에서 짧은 요청이 어떻게 구체적인 질문 절차로 바뀌는지 짚습니다.\n\n다음 장에서 실제로 사용할 네 질문을 확인합니다.',
      detailNote: '[약 1분]\n\n대상, 핵심 결과, 금지, 완료 기준의 네 질문을 차례로 읽습니다. 참가자가 자신의 포트폴리오를 기준으로 각 질문에 한 문장씩 답하게 합니다. 답이 모호하면 파일을 만들기 전에 질문을 한 번 더 좁히는 것이 핵심입니다.\n\n이 합의를 실행 순서로 바꾸는 writing-plans로 넘어갑니다.'
    },
    {
      targetSlide: '16', key: 'writing-plans', eyebrow: '02 · 실행 계획 · 실전',
      title: 'writing-plans는 네 칸으로 실행 가능성을 확인한다',
      html: '<div class="four-grid"><div class="panel"><h3>01 파일</h3><p>어떤 파일을 만들거나 바꾸며 각 파일의 역할은 무엇인가?</p></div><div class="panel"><h3>02 작업</h3><p>각 단계에서 정확히 무엇을 하고 어디서 멈추는가?</p></div><div class="panel"><h3>03 정상 결과</h3><p>성공했을 때 화면과 터미널에 무엇이 보여야 하는가?</p></div><div class="panel"><h3>04 검증</h3><p>사람이 승인 전에 어떤 명령과 화면을 직접 확인하는가?</p></div></div>',
      overviewNote: '[약 1분]\n\nwriting-plans는 합의한 방향을 파일, 작업 순서, 정상 결과, 검증 방법으로 바꾼다고 설명합니다. 계획이 길어지는 것이 목적이 아니라 실행 중 추측과 요청하지 않은 변경을 줄이는 것이 목적입니다.\n\n다음 장에서 승인 전에 읽을 네 칸을 확인합니다.',
      detailNote: '[약 1분]\n\n파일, 작업, 정상 결과, 검증의 네 칸을 짚습니다. 특히 정상 결과와 검증을 구분합니다. 정상 결과는 기대 상태이고, 검증은 그 상태를 사람이 확인하는 방법입니다. 삭제나 구조 변경이 계획에 숨어 있지 않은지도 함께 봅니다.\n\n이제 계획대로 만든 화면의 전달력을 다루는 frontend-design으로 넘어갑니다.'
    },
    {
      targetSlide: '17', key: 'frontend-design', eyebrow: '03 · 화면 개선 · 실전',
      title: 'frontend-design은 30초 읽기 순서를 설계한다',
      html: '<div class="four-grid"><div class="panel"><h3>01 첫 시선</h3><p>이름·역할·핵심 메시지가 가장 먼저 보이는가?</p></div><div class="panel"><h3>02 정보 위계</h3><p>제목, 설명, 카드의 크기와 간격이 중요도 순서와 맞는가?</p></div><div class="panel"><h3>03 모바일</h3><p>390×844에서도 가로 넘침 없이 같은 순서로 읽히는가?</p></div><div class="panel"><h3>04 사용 권한</h3><p>이미지·로고·폰트가 공개 페이지에서 사용 가능한가?</p></div></div>',
      overviewNote: '[약 1분]\n\nfrontend-design은 장식을 추가하는 스킬이 아니라 대상이 핵심 메시지를 빠르게 이해하도록 정보 순서, 타이포그래피, 간격, 모바일 흐름을 설계하는 절차라고 설명합니다.\n\n다음 장에서 30초 안에 읽히는지 확인할 네 지점을 봅니다.',
      detailNote: '[약 1분]\n\n첫 시선, 정보 위계, 모바일, 사용 권한을 확인합니다. 참가자에게 화면을 30초만 본 사람이 이름과 역할과 대표 업무를 말할 수 있는지 질문합니다. 내용 변경 없이 전달 순서만 개선하는 것이 핵심입니다.\n\n다음은 문제를 추측으로 고치지 않는 systematic-debugging입니다.'
    },
    {
      targetSlide: '18', key: 'systematic-debugging', eyebrow: '04 · 오류 해결 · 실전',
      title: 'systematic-debugging은 네 단계로 원인을 좁힌다',
      html: '<div class="four-grid"><div class="panel"><h3>01 재현</h3><p>같은 URL과 같은 조건에서 문제가 반복되는가?</p></div><div class="panel"><h3>02 증거 수집</h3><p>Git 상태·Push·Pages 설정·파일 경로 중 어디가 기대와 다른가?</p></div><div class="panel"><h3>03 가설 검증</h3><p>한 번에 원인 하나만 확인해 다른 가능성을 제거하는가?</p></div><div class="panel"><h3>04 최소 수정</h3><p>증명된 원인에 필요한 가장 작은 변경만 적용하는가?</p></div></div>',
      overviewNote: '[약 1분]\n\nsystematic-debugging은 오류 메시지를 보자마자 설정을 바꾸지 않고 재현과 증거로 원인을 좁히는 절차라고 설명합니다. Pages 404 사례에서 Git, Push, 설정, 파일 경로, URL을 순서대로 확인합니다.\n\n다음 장에서 네 단계 조사 루프를 확인합니다.',
      detailNote: '[약 1분]\n\n재현, 증거 수집, 가설 검증, 최소 수정의 순서를 읽습니다. 한 번에 여러 설정을 바꾸면 무엇이 원인이었는지 알 수 없다는 점을 강조합니다. 증명된 원인 하나에만 최소 변경을 적용한 뒤 같은 조건으로 다시 재현합니다.\n\n마지막으로 완료 주장을 증거로 바꾸는 verification-before-completion을 봅니다.'
    },
    {
      targetSlide: '19', key: 'verification-before-completion', eyebrow: '05 · 완료 검증 · 실전',
      title: 'verification-before-completion은 네 증거를 한 번에 묶는다',
      html: '<div class="four-grid"><div class="panel"><h3>01 자동 확인</h3><p>테스트·문법 검사·빌드가 방금 실행되어 통과했는가?</p></div><div class="panel"><h3>02 화면</h3><p>데스크톱과 모바일에서 제목·링크·넘침을 직접 봤는가?</p></div><div class="panel"><h3>03 변경 내용</h3><p><code>git status</code>와 Diff가 승인한 범위와 일치하는가?</p></div><div class="panel"><h3>04 공개 결과</h3><p>실제 공개 URL을 새 탭에서 열어 최신 결과를 확인했는가?</p></div></div>',
      overviewNote: '[약 1분]\n\nverification-before-completion은 “완료했습니다”라는 문장을 최신 테스트, 화면, 변경 내용, 공개 URL의 증거로 바꾸는 절차라고 설명합니다. 과거 테스트나 로컬 화면만으로 공개 완료를 주장하지 않습니다.\n\n다음 장에서 완료를 승인하는 네 증거를 확인합니다.',
      detailNote: '[약 1분]\n\n자동 확인, 화면, 변경 내용, 공개 결과의 네 증거를 구분합니다. 각각은 다른 실패를 잡기 때문에 하나로 대신할 수 없습니다. 참가자가 실제 공개 URL을 직접 열고 Git 상태와 대조한 뒤에만 완료를 승인하도록 안내합니다.\n\n이제 다섯 스킬을 설치하고 사용하는 흐름으로 넘어갑니다.'
    }
  ];

  const notesElement = document.getElementById('speaker-notes-data');
  if (!notesElement) return;

  let sourceNotes;
  try { sourceNotes = JSON.parse(notesElement.textContent || '[]'); }
  catch (error) { return; }

  const notesBySlide = new Map(sourceNotes.map((note) => [String(note.slide), note]));
  const expansionByKey = new Map(expansions.map((item) => [item.key, item]));

  for (const item of expansions) {
    const sourceSlide = document.querySelector(`.slide[data-slide="${item.targetSlide}"]`);
    if (!sourceSlide) continue;
    sourceSlide.dataset.minutes = '1';
    sourceSlide.dataset.notes = item.overviewNote;

    const detailSlide = document.createElement('section');
    detailSlide.className = 'slide wide skill-slide';
    detailSlide.dataset.slide = `skill-${item.targetSlide}-detail`;
    detailSlide.dataset.minutes = '1';
    detailSlide.dataset.notes = item.detailNote;
    detailSlide.dataset.skillDetail = item.key;
    detailSlide.innerHTML = `<div><p class="eyebrow">${item.eyebrow}</p><h2>${item.title}</h2></div>${item.html}`;
    sourceSlide.insertAdjacentElement('afterend', detailSlide);
  }

  const normalizeTitle = (value) => String(value || '').replace(/\s+/g, ' ').trim();
  const rebuiltNotes = Array.from(document.querySelectorAll('.slide')).map((slide, index) => {
    const heading = slide.querySelector('h1,h2');
    const title = normalizeTitle(heading?.innerText || heading?.textContent);
    const detailKey = slide.dataset.skillDetail;
    if (detailKey) {
      return { slide: index + 1, title, body: expansionByKey.get(detailKey)?.detailNote || slide.dataset.notes };
    }
    const originalNote = notesBySlide.get(slide.dataset.slide);
    const expansion = expansions.find((item) => item.targetSlide === slide.dataset.slide);
    return { slide: index + 1, title, body: expansion?.overviewNote || originalNote?.body || slide.dataset.notes || '(No notes)' };
  });

  notesElement.textContent = JSON.stringify(rebuiltNotes);
})();
