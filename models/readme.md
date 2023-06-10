# KNUT Final Project Sample

## Models

### Subscriber.js

- `name`* : String
- `email`* : String
- `phoneNumber` : String
- `newsletter` : Boolean
- `profileImg` : String
- `courses` : Array of mongoose.Schema.Course
- `timestamps` : Boolean
  - `createdAt` : Date
  - `updatedAt` : Date

### User.js

- `name` : Object
  - `first` : String
  - `last` : String
- `email`* : String
- `username`* : String
- `phoneNumber` : String
- `password`* : String
- `courses` : Array of mongoose.Schema.Course
- `subscribedAccount` : mongoose.Schema.Subscriber
- `profileImg` : String
- `timestamps` : Boolean
  - `createdAt` : Date
  - `updatedAt` : Date

### Course.js

- `title`* : String
- `description`* : String
- `maxStudents` : Number
    - `startDate` : Date
    - `endDate` : Date
    - `location` : String
- `cost` : Number
    - `instructor` : mongoose.Schema.User
    - `students` : Array of mongoose.Schema.User
- `timestamps` : Boolean
  - `createdAt` : Date
  - `updatedAt` : Date

### Train.js

- `title`* : String
- `description` : String
- `button` : String
    - `link` : String
- `trainImg` : String
- `modalText` : String
    - `timestamps` : Boolean
      - `createdAt` : Date
      - `updatedAt` : Date

### Talk.js

- `meta` : Object
  - `title`* : String
  - `subtitle` : String
  - `abstractOneLine`* : String
  - `abstract` : String
  - `keywords` : String
- `given` : Object
  - `date` : Date
  - `location` : Object
    - `name` : String
    - `korean` : String
    - `url` : String
  - `organization` : Object
    - `name` : String
    - `korean` : String
    - `url` : String
  - `event` : Object
    - `name` : String
    - `korean` : String
    - `url` : String
  - `links` : Object
    - `code` : String
    - `slides` : String
    - `article` : String
- `user` : mongoose.Schema.User
- `timestamps` : Boolean
  - `createdAt` : Date
  - `updatedAt` : Date

