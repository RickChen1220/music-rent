export default function Facilities({ selected, onChange }) {
  function handleClick(e) {
    const {checked, name} = e.target;
    if (checked){
      onChange([...selected, name]);
    }else {
      onChange([...selected.filter((selectedName) => selectedName !== name)])
    }
  }
  return (
    <div>
      <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            name="air"
            onChange={handleClick}
            className="flex"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M22 3.6V11H2V3.6a.6.6 0 0 1 .6-.6h18.8a.6.6 0 0 1 .6.6ZM18 7h1M2 11l.79 2.584A2 2 0 0 0 4.702 15H6m16-4l-.79 2.584A2 2 0 0 1 19.298 15H18m-8.5-.5s0 7-3.5 7m8.5-7s0 7 3.5 7m-6-7v7"
            />
          </svg>
          <span>Air conditioning</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" name="piano" onChange={handleClick} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 48 48"
          >
            <mask id="ipTPiano0">
              <svg
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
              >
                <path fill="#555" d="M4 8h40v16H4z" />
                <path d="M4 24h40v16H4zm6 0v8m6-8v8m10-8v8m6-8v8m6-8v8" />
              </svg>
            </mask>
            <path
              fill="currentColor"
              d="M0 0h48v48H0z"
              mask="url(#ipTPiano0)"
            />
          </svg>
          <span>Piano</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" name="stand" onChange={handleClick} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            fill="#000000"
            width="24"
            height="24"
            viewBox="0 0 201.862 201.862"
            version="1.1"
            id="Capa_1"
            xmlSpace="preserve"
          >
            <path d="M100.931,201.861c-1.104,0-2-0.896-2-2V167.03l-36.146,34.282c-0.801,0.761-2.068,0.727-2.828-0.075  c-0.76-0.801-0.727-2.067,0.075-2.827l38.899-36.893V80.284H37.464c-0.288,0-0.561-0.061-0.808-0.17  c-0.234-0.104-0.452-0.253-0.639-0.45c-0.022-0.023-0.044-0.047-0.065-0.071c-0.155-0.179-0.272-0.377-0.354-0.586  c0,0,0-0.003-0.001-0.005c-0.071-0.186-0.116-0.385-0.129-0.592v-0.002l0-0.003c-0.002-0.043-0.003-0.086-0.003-0.129V17.632  c0-1.104,0.896-2,2-2H70.56V2c0-1.104,0.896-2,2-2h56.742c1.104,0,2,0.896,2,2v13.632h33.095c1.104,0,2,0.896,2,2v60.646  c0,0.029,0,0.059-0.001,0.089c-0.001,0.002,0,0.003,0,0.005c-0.01,0.228-0.058,0.444-0.137,0.646  c-0.091,0.231-0.228,0.449-0.409,0.641l0,0.001c-0.001,0.001-0.002,0.002-0.004,0.004l0,0c-0.001,0.002-0.003,0.003-0.004,0.004h0  l-0.001,0.002c-0.189,0.197-0.409,0.347-0.644,0.448c-0.244,0.107-0.514,0.166-0.798,0.166h-61.466v81.233l38.741,36.742  c0.801,0.76,0.835,2.026,0.075,2.827c-0.76,0.802-2.025,0.836-2.828,0.075l-35.988-34.132v32.831  C102.931,200.966,102.036,201.861,100.931,201.861z M131.302,76.284h28.13l-28.13-27.048V76.284z M74.56,76.284h52.742V4H74.56  V76.284z M42.531,76.284H70.56V50.068L42.531,76.284z M39.464,19.632v54.043L70.56,44.592v-24.96H39.464z M131.302,43.688  l31.095,29.899V19.632h-31.095V43.688z M114.148,34.102H87.767c-1.104,0-2-0.896-2-2s0.896-2,2-2h26.381c1.104,0,2,0.896,2,2  S115.253,34.102,114.148,34.102z M120.648,24.262H81.267c-1.104,0-2-0.896-2-2s0.896-2,2-2h39.381c1.104,0,2,0.896,2,2  S121.753,24.262,120.648,24.262z" />
          </svg>
          <span>Music stand</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" name="amp" onChange={handleClick} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M20 6h-2V4c0-1.103-.897-2-2-2H8c-1.103 0-2 .897-2 2v2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2zM8 4h8v2H8V4zM6 19a1 1 0 1 1 0-2a1 1 0 0 1 0 2zm0-3a1 1 0 1 1 0-2a1 1 0 0 1 0 2zm3 3a1 1 0 1 1 0-2a1 1 0 0 1 0 2zm0-3a1 1 0 1 1 0-2a1 1 0 0 1 0 2zm3 3a1 1 0 1 1 0-2a1 1 0 0 1 0 2zm0-3a1 1 0 1 1 0-2a1 1 0 0 1 0 2zm3 3a1 1 0 1 1 0-2a1 1 0 0 1 0 2zm0-3a1 1 0 1 1 0-2a1 1 0 0 1 0 2zm3 3a1 1 0 1 1 0-2a1 1 0 0 1 0 2zm0-3a1 1 0 1 1 0-2a1 1 0 0 1 0 2zm2-4H4V8h16v4z"
            />
            <path fill="currentColor" d="M14 9h2v2h-2zm3 0h2v2h-2z" />
          </svg>
          <span>Guitar amplifier</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" name="drum" onChange={handleClick} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 518 518"
          >
            <path
              fill="currentColor"
              d="m111 58.3l-87.37.4l-.61 8.3L192.4 92.6l1.8-8.1zm310.8 18.8l-.3 29.7l5-.8l4.9.8l-.3-29.7zM96.33 92.8l-1.81 13l-33.17 26.4l1.84 115.6l6.16-40.4l9.55-2.3h.28l-1.03-65l31.95-25.4l2.7-19.4zm330.17 25.9l-66.6 10.4l.6 8.3h132l.6-8.3zm-66 33.3l-.6 8.3l66.6 10.4l66.6-10.4l-.6-8.3zm60.3 30.5l-.2 20.8c2.8.5 5.6 1.2 8.5 1.8l3.3.8l-.2-23.4l-5.7.9zm-287.4 30.7c-16.5-.2-33.5 1.9-51.1 6.1l-2.86 18.8c23.26-3.3 75.96-6.9 127.56 14.6c4-1.6 8.2-3.1 12.4-4.3l1.2-8c-26.6-18.2-55.8-26.8-87.2-27.2zm241.2 0c-31.4.4-60.6 9-87.2 27.2l1.2 8c4.2 1.2 8.4 2.7 12.4 4.3c51.6-21.5 104.3-17.9 127.6-14.6l-2.9-18.8c-17.6-4.2-34.6-6.3-51.1-6.1zm-258.1 39c-17.91 0-32.1 1.8-39.69 3.1l-7.05 46.3l72.94 11.1c10.1-20.3 25.5-37.5 44.5-49.6c-25.4-8.5-50.4-10.9-70.7-10.9zm275 0c-20.3 0-45.3 2.4-70.7 10.9c19 12.1 34.4 29.3 44.5 49.6l72.9-11.1l-7-46.3c-7.6-1.3-21.8-3.1-39.7-3.1zm-137.5 10c-49.9 0-90.4 40.5-90.4 90.4c0 49.9 40.5 90.4 90.4 90.4c49.9 0 90.4-40.5 90.4-90.4c0-49.9-40.5-90.4-90.4-90.4zM64.27 315.5l1.36 85.5l-46.73 87h18.94l33.24-62l15.19 62h17.23l-21.19-86l-1.33-84zM433.6 317l-14.2 2.2l-.8 74.1l-24.2 55.7l7.4 25l24.7-57l30.9 71h18.2l-41.2-94.7zm-279.7 11.6c-4.7 12.1-7.2 25.2-7.2 38.9C146.7 427 194.8 475 254 475c59.2 0 107.3-48 107.3-107.5c0-13.7-2.5-26.8-7.2-38.9c1.8 7.7 2.8 15.8 2.8 24C356.9 409 310.8 456 254 456c-56.8 0-102.9-47-102.9-103.4c0-8.2 1-16.3 2.8-24zm-18 77.4l-20.2 82h25.7l11.8-48c-7.4-11-13.3-22-17.3-34zm236.2 0c-4 12-9.9 23-17.3 34l11.8 48h25.7z"
            />
          </svg>
          <span>Drum set</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" name="mic" onChange={handleClick} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            width="24"
            height="24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
            />
          </svg>

          <span>Microphone</span>
        </label>
      </div>
    </div>
  );
}
