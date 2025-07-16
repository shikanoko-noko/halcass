const OnPaste = () => {
  navigator.clipboard
    .readText()
    .then((text) => {
      document.getElementById("linkInput").value = text;
    })
    .catch((err) => {
      alert("접근 실패", err);
    });
};

const OnDelete = () => {
  document.getElementById("linkInput").value = "";
  document.getElementById("linkChange").value = "";
};

const target = document.getElementById("linkInput");

const OnCopyLink = () => {
  const input = document.getElementById("linkChange");

  navigator.clipboard
    .writeText(input.value)
    .then(() => {
      alert("복사 성공!");
    })
    .catch((err) => {
      alert("복사 실패: " + err);
    });
};

const handleOnInput = (text, max) => {
  if (text.value.length > max) {
    text.value = text.value.substr(0, max);
  }

  if (text.value < 0) {
    text.value = 0;
  }

  if (text.value > 98) {
    text.value = 98;
  }
};

const secondLimit = (num) => {
  if (num.value > 59) {
    num.value = 59;
  }
};

const startNumber = document.getElementById("startNumber");

const startCalculate = () => {
  const startMinute = Number(document.getElementById("startMinute").value);

  const startSecond = Number(document.getElementById("startSecond").value);

  return Number(startMinute * 60 + startSecond);
};
startNumber.value = startCalculate();
const updateStartNumber = () => {
  startNumber.value = startCalculate();
};

const endNumber = document.getElementById("endNumber");

const endCalculate = () => {
  const endMinute = Number(document.getElementById("endMinute").value);

  const endSecond = Number(document.getElementById("endSecond").value);

  return Number(endMinute * 60 + endSecond);
};
endNumber.value = endCalculate();
const updateEndNumber = () => {
  endNumber.value = endCalculate();
};

const OnCopyStart = () => {
  const input = startNumber;

  navigator.clipboard
    .writeText(input.value)
    .then(() => {
      alert("복사 성공!");
    })
    .catch((err) => {
      alert("복사 실패: " + err);
    });
};

const OnCopyEnd = () => {
  const input = endNumber;

  navigator.clipboard
    .writeText(input.value)
    .then(() => {
      alert("복사 성공!");
    })
    .catch((err) => {
      alert("복사 실패: " + err);
    });
};

const finalText = document.getElementById("final");

finalText.value = `!영상후원 영상링크 ${
  document.getElementById("startNumber").value
} ${document.getElementById("endNumber").value}`;

const finalChange = () => {
  finalText.value = `!영상후원 ${document.getElementById("linkChange").value} ${
    document.getElementById("startNumber").value
  } ${document.getElementById("endNumber").value}`;
};

target.addEventListener("paste", (event) => {
  const paste = (event.clipboardData || window.clipboardData).getData("text");

  const changePaste = document.getElementById("linkChange");

  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;

  const match = paste.match(regex);

  changePaste.value = match ? match[1] : null;

  finalChange();
});

const OnCopyFinal = () => {
  const input = finalText;

  navigator.clipboard
    .writeText(input.value)
    .then(() => {
      alert("복사 성공!");
    })
    .catch((err) => {
      alert("복사 실패: " + err);
    });
};

document.getElementById("paste").addEventListener("click", async () => {
  try {
    // 클립보드에서 텍스트 읽기
    const paste = await navigator.clipboard.readText();

    // 유튜브 ID 정규표현식 추출
    const regex =
      /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
    const match = paste.match(regex);

    // 결과 반영
    document.getElementById("linkChange").value = match ? match[1] : "";
    finalChange();
  } catch (err) {
    alert("클립보드 읽기 실패: " + err);
  }
});
