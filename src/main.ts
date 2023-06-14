const button = document.querySelector("#generate-pwd");
const display: HTMLInputElement | null = document.querySelector("#display");
const passwordLength: HTMLInputElement | null =
  document.querySelector("#length");
const options: any = document.querySelectorAll(".select-box input");
const clipboard: HTMLButtonElement | null =
  document.querySelector("#clipboard");

type IChar = {
  lowercase: string;
  uppercase: string;
  numbers: string;
  symbols: string;
};

const characters: IChar | any = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*_-",
};

function getCheckedValue() {}

function generateRandomPassword() {
  let passwordCharacters: string = "";
  let generatedPassword: string = "";
  options!.forEach((option: any) => {
    if (option.checked) {
      passwordCharacters += characters[option.id];
    }
  });

  for (let i = 0; i < Number(passwordLength?.value); i++) {
    const randomChars = Math.floor(Math.random() * passwordCharacters?.length);
    generatedPassword += passwordCharacters?.substring(
      randomChars,
      randomChars + 1
    );
  }
  display!.value = generatedPassword;
}
generateRandomPassword();

function copyToClipboard(e: any) {
  e.preventDefault();
  navigator.clipboard.writeText(display!.value);
  clipboard!.innerHTML = `<i class="fa-regular fa-circle-check"></i>`;
  setTimeout(() => {
    clipboard!.innerHTML = `<i class="fa-regular fa-clipboard"></i>`;
  }, 3000);
}

clipboard?.addEventListener("click", copyToClipboard);
button?.addEventListener("click", (e) => {
  e.preventDefault();
  generateRandomPassword();
});
