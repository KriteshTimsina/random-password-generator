const button = document.querySelector("#generate-pwd");
const display: HTMLInputElement | null = document.querySelector("#display");
const passwordLength: HTMLInputElement | null =
  document.querySelector("#length");
const uppercase: HTMLInputElement | null = document.querySelector("#uppercase");
const lowercase: HTMLInputElement | null = document.querySelector("#lowercase");
const numbers: HTMLInputElement | null = document.querySelector("#numbers");
const symbols: HTMLInputElement | null = document.querySelector("#specials");
const clipboard = document.querySelector("#clipboard");

const lowercaseChars: string = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars: string = "0123456789";
const specialsChars: string = "!@#$%^&*_-";

function getCheckedValue() {
  let value = "";

  if (lowercase?.checked) {
    value = lowercaseChars;
  }
  if (uppercase?.checked) {
    value = uppercaseChars;
  }
  if (numbers?.checked) {
    value = numberChars;
  }
  if (symbols?.checked) {
    value = specialsChars;
  }
  if (symbols?.checked && lowercase?.checked) {
    value = specialsChars + lowercaseChars;
  }
  if (symbols?.checked && uppercase?.checked) {
    value = specialsChars + uppercaseChars;
  }
  if (symbols?.checked && numbers?.checked) {
    value = specialsChars + numberChars;
  }
  if (numbers?.checked && lowercase?.checked) {
    value = numberChars + lowercaseChars;
  }
  if (numbers?.checked && uppercase?.checked) {
    value = numberChars + uppercaseChars;
  }

  if (lowercase?.checked && uppercase?.checked) {
    value = lowercaseChars + uppercaseChars;
  }
  if (lowercase?.checked && uppercase?.checked && numbers?.checked) {
    value = lowercaseChars + uppercaseChars + numberChars;
  }
  if (
    lowercase?.checked &&
    uppercase?.checked &&
    numbers?.checked &&
    symbols?.checked
  ) {
    value = lowercaseChars + uppercaseChars + numberChars + specialsChars;
  }
  return value;
}

function handleSubmit(e: any) {
  e.preventDefault();
  const password = generatePassword();
  display!.value = password;

  clipboard?.addEventListener("click", async (e) => {
    e.preventDefault();
    await navigator.clipboard.writeText(password);
    clipboard.innerHTML = "&check;";
    setTimeout(() => {
      clipboard.innerHTML = "&#128203;";
    }, 3000);
  });
}

function generatePassword() {
  const passwordChars = getCheckedValue();

  let pass: string = "";
  for (let i = 0; i < Number(passwordLength?.value); i++) {
    const randomChars = Math.floor(Math.random() * passwordChars?.length);
    pass += passwordChars?.substring(randomChars, randomChars + 1);
  }

  return pass;
}

button?.addEventListener("click", handleSubmit);
