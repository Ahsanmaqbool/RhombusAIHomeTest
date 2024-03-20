# RhombusAIHomeTest
This repo contains tasked with creating a web application that processes and displays data, focusing on data type inference and conversion for datasets using Python and Pandas.


### Setup
1. Clone the repository
```
[git clone <repository_url>](https://github.com/Ahsanmaqbool/RhombusAIHomeTest.git)
cd <DataParseApi>
```
2. Create a virtual environment (optional but recommended):

```
python3 -m venv env
source env/bin/activate
```
3. Install dependencies:
```
pip install -r requirements.txt
``` 
4. Migrate the database:
```
python manage.py migrate
```
5. Run the Django development server:
```
python manage.py runserver
```
### Test
For django user module test use the following command:
python manage.py test
```

### Endpoint:
```http://127.0.0.1:8000/api/docs/```

## Rhombus UI
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
```

