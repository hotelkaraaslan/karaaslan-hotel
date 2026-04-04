"use client";

const WHATSAPP_NUMBER = "905439579009";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile iletişime geç"
      onClick={() => { try { (window as any).gtag?.('event', 'conversion', { send_to: 'AW-11117083356/gm6GCIDU6uMZENz1hLUp' }); } catch {} }}
      className="fixed bottom-6 right-6 z-[9998] flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
      style={{ backgroundColor: "#25D366" }}
    >
      <svg viewBox="0 0 32 32" width="30" height="30" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.61 1.824 6.51L4 29l7.697-1.797A11.938 11.938 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 21.75a9.718 9.718 0 01-5.004-1.387l-.36-.213-3.73.871.896-3.642-.234-.374A9.713 9.713 0 016.25 15C6.25 9.615 10.615 5.25 16 5.25S25.75 9.615 25.75 15 21.385 24.75 16 24.75zm5.29-7.178c-.29-.145-1.715-.847-1.98-.944-.265-.097-.458-.145-.651.145-.193.29-.748.944-.917 1.137-.169.193-.338.217-.628.072-.29-.145-1.224-.451-2.33-1.438-.861-.768-1.443-1.716-1.612-2.006-.169-.29-.018-.447.127-.591.13-.13.29-.338.435-.507.145-.169.193-.29.29-.483.097-.193.048-.362-.024-.507-.072-.145-.651-1.57-.892-2.15-.235-.563-.474-.487-.651-.496l-.555-.01c-.193 0-.507.072-.772.362-.265.29-1.013 1.01-1.013 2.462 0 1.452 1.037 2.857 1.182 3.05.145.193 2.04 3.113 4.943 4.364.692.299 1.232.477 1.653.61.695.22 1.327.189 1.826.115.557-.083 1.715-.702 1.956-1.38.241-.677.241-1.258.169-1.38-.072-.121-.265-.193-.555-.338z" />
      </svg>
    </a>
  );
}
