export class Usuario {

    static fromFireBase({uid, name, email}) {
        
        return new Usuario(uid, name, email);
        
    }

    constructor(
        public uid: string,
        public name: string,
        public email: string
    ) { }
    
}