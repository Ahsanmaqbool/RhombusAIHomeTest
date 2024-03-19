## Installation

Use the package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install Project using Node v18.17.0.

```bash
npm install
```

```bash
npm run dev
```

The project will run on port:3000

## Usage

```
1-Register account

2-Login using your registered email and password

3-Upload CSV File from the device

4- The table will show processed CSV data
```

## Folder Structure

```

├── public
│   ├── ....
├── src
│   ├── assets
│   │   │   ├── images...
│   ├── components
│   │   ├── AuthContainer.jsx
│   │   ├── ErrorComponent.jsx
│   │   ├── Login.jsx
│   │   ├── ProcessedDataComponent.jsx
│   │   ├── Profile.jsx
│   │   ├── RegisterUserComponent.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── Main.jsx
├── .gitignore
├── package.json
└── README.md
└── package.json
```

## Component Tree

```
                                    Main
                                     │
                               AuthContainer
                             --------│--------
                            │                 │
                     Login/Register        Profile
                                              │
                           ----------------------------------------
                          │                   │                    │
                  UploadFileComponent   ErrorComponent  ProcessedDataComponent


```

## License

[MIT](https://choosealicense.com/licenses/mit/)
