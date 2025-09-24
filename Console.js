// Setting up the variables
const Assignments = "https://raw.githubusercontent.com/Mortemdeath/MPanel/refs/heads/main/assignments/"

// Adding Panel Button
const MPanelButton = document.createElement("button");
MPanelButton.textContent = "MPanel";
MPanelButton.style.cursor = "pointer";
MPanelButton.style.padding = "6px 10px";
MPanelButton.style.marginLeft = "8px";
const ButtonPlace = document.querySelector(".end") || document.body;
ButtonPlace.appendChild(MPanelButton);

// small feedback helper
function showMessage(msg, isError = false, timeout = 3000) {
  const div = document.createElement("div");
  div.textContent = msg;
  div.style.position = "fixed";
  div.style.bottom = "16px";
  div.style.right = "16px";
  div.style.padding = "8px 12px";
  div.style.borderRadius = "6px";
  div.style.color = isError ? "#960000" : "#0a5d00";
  div.style.background = isError ? "#ffe6e6" : "#e6ffe6";
  div.style.fontFamily = "system-ui, Arial";
  div.style.zIndex = 99999;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), timeout);
}

// Parse assignment/round/question from URL
function parseNumbersFromUrl(url) {
  const m = url.match(/assignments\/(\d+)\/round\/(\d+)\/question\/(\d+)/i);
  if (m) {
    return { assignment: m[1], round: m[2], question: m[3] };
  }
  return null;
}

// Fetch and copy file
async function fetchAndCopy(currentUrl) {
  const parsed = parseNumbersFromUrl(currentUrl);
  if (!parsed) {
    showMessage("Could not find assignment/round/question in URL.", true);
    return;
  }

  const fileUrl = `${Assignments}${parsed.assignment}/round/${parsed.round}/question/${parsed.question}.py`;

  try {
    const res = await fetch(fileUrl);
    if (!res.ok) throw new Error("File not found");
    const text = await res.text();
    await navigator.clipboard.writeText(text);
    showMessage(`Copied ${parsed.assignment}/round/${parsed.round}/question/${parsed.question}.py`);
    console.log("Source:", fileUrl);
  } catch (err) {
    showMessage("Failed to fetch or copy: " + err.message, true);
  }
}

// Button click
MPanelButton.addEventListener("click", () => {
  fetchAndCopy(location.href);
});
