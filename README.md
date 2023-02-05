# 1. TasK
# https://docs.google.com/document/d/1VqWU3it9O2Ov5FfVGfP6Ece_jSdRBxsAUAROHYoFGNk/edit
# 2. How to run
    npm install
    npm run start
    or
    npm run build
# 3. Database snapshot
    Database : 
        User token : {}
        User token : {}
        User token : {
            mail: ".....@gmail.com"
            name: "....."
            uid: /O8EHA5j....
            decks: {
                deck1 :{}
                deck2 :{
                    id: 2,
                    deskName,
                    colons: {
                        colon1: {}
                        colon2: {
                            colonName: "..."
                            id: 2
                            tasks: {
                                task1: {}
                                task2: {}
                                task3: {
                                    completed: false
                                    date: tomorrow
                                    id: 3
                                    taskName: "...."
                                }
                            }
                        }
                    }
                }
            }
        }
# 4. Deploy https://elastic-payne-4b0c5d.netlify.app/
        !!! To sing in like admin:
                e-mail: admin@gmail.com
                pass: 1234567890
# 5. File structure
    Root:
        -mode_modules
        -public  /public assets\
        -src 
            * components
                ` blocks
                    - componentName
                    - ...
                    - componentName
                        ^ component.tsx
                        ^ index.tsx
                        ^ styles.css
                ` controls
                ` pages
            * constants
                ` patterns.ts
                ` routerLinks.ts
                ` voidObjects.ts
            * types
                ` componentType.ts
                ` ...
                ` componentType.ts
            * utils
                ` ...
            * App.tsx
            * index.tsx

                
