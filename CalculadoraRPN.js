class CalculadoraRPN {
    constructor() {
        this.pila = [];
        this.nextPila = 0;
        this.nextNum = "";
        this.isShift = false;
        document.addEventListener('keydown', (event) => {
            this.#ejecutar(event.key);
        });
    }

    #ejecutar(char)
    {
        if(!isNaN(char))
        {
            this.digito(char);
            return;
        }
        switch(char)
        {
            case "q": this.masMenos(); break;
            case "z": this.raiz(); break;
            case "a": this.apagar(); break;
            case "Backspace": this.borrar(); break;
            case "Enter": this.enter(); break;
            case "+": this.operacionBinaria("+"); break;
            case "-": this.operacionBinaria("-"); break;
            case "*": this.operacionBinaria("*"); break;
            case "/": this.operacionBinaria("/"); break;
            case ".": this.punto(); break;
            case "s": this.operacionUnaria("sin"); break;
            case "t": this.operacionUnaria("tan"); break;
            case "c": this.operacionUnaria("cos"); break;
            case "S": this.operacionUnaria("asin"); break;
            case "T": this.operacionUnaria("atan"); break;
            case "C": this.operacionUnaria("acos"); break;
        }
    }

    #print() {
        for(var i = 0; i <= this.pila.length; i++) {
            document.getElementById("linea" + i).value = i == this.nextPila? this.nextNum : this.pila[i - 1];
        }
        for(var i = this.pila.length + 1; i <= 10; i++) {
            document.getElementById("linea" + i).value = "";
        }
    }

    operacionBinaria(operando) {
        if(this.#params(2)) {
            var op1 = this.pila[1];
            var op2 = this.pila[0];
            var res = 0;
            switch(operando) {
                case "+": res = Number(Number(op1) + Number(op2)); break;
                case "-": res = Number(Number(op1) - Number(op2)); break;
                case "·/·": res = Number(Number(op1) / Number(op2)); break;
                case "*": res = Number(Number(op1) * Number(op2)); break;
                case "^": res = Number(Number(op1) ** Number(op2)); break;
            }
            this.#dosPorUno(res);
            this.#print();
        }
        if(this.isShift) this.doShift();
    }

    operacionUnaria(operando) {
        if(this.#params(1))
        {
            var op1 = this.pila[0];
            var res = 0;
            switch(operando) {
                case "sin": res = Math.round(Math.sin(op1) * 100000)/100000; break;
                case "cos": res = Math.round(Math.cos(op1) * 100000)/100000; break;
                case "tan": res = Math.round(Math.tan(op1) * 100000)/100000; break;
                case "asin": if(op1 >= -1 && op1 <= 1) res = Math.round(Math.asin(op1) * 100000)/100000; break;
                case "acos": if(op1 >= -1 && op1 <= 1) res = Math.round(Math.acos(op1) * 100000)/100000; break;
                case "atan": if(op1 >= -1 && op1 <= 1) res = Math.round(Math.atan(op1) * 100000)/100000; break;
                case "sqrt": if(op1 >= -1 && op1 <= 1) res = Math.sqrt(op1); break;
                case "!": if(op1 > 0) res = Number(this.#factorial(op1)); break;
                case "ln": if(op1 > 0) res = Math.log(op1); break;
            }
            this.pila[0] = res;
            this.#print();
        }
        if(this.isShift) this.doShift();
    }

    enter() {
        if(this.#unNumero()) {
            if(this.pila.length < 10) {
                this.#unoMas(this.nextNum);
                this.nextNum = "";
                this.#print();
            }
        }
    }

    borrar() {
        this.nextNum = "";
        this.#print();
    }

    apagar() {
        if(this.isShift) this.doShift();
        this.pila = [];
        this.nextPila = 0;
        this.nextNum = "";
        this.isShift = false;
        this.#print();
    }

    raiz() {
        this.operacionUnaria("sqrt");
    }

    punto() {
        this.digito(".");
    }

    multiplicacion() {
        this.operacionBinaria("*");
    }

    potencia() {
        this.operacionBinaria("^");
    }

    factorial() {
        this.operacionUnaria("!");
    }

    digito(digito) {
        this.nextNum = this.nextNum + "" + digito;
        this.#print();
        if(this.isShift) this.doShift();
    }

    masMenos() {
        this.nextNum = (Number(this.nextNum) * -1) + "";
        this.#print();
    }

    PI() {
        if(this.pila.length < 10 && this.nextNum == "") {
            this.digito(Math.PI);
            this.enter();
        }
    }

    E() {
        if(this.pila.length < 10 && this.nextNum == "") {
            this.digito(Math.E);
            this.enter();
        }
    }

    #unoMas(res) {
        var aux = this.pila.length;
        for(var i = aux; i > 0; i--) {
            this.pila[i] = this.pila[i - 1]
        }
        this.pila[0] = res;
    }

    #dosPorUno(res) {
        for(var i = 0; i < this.pila.length; i++) {
            if(i == 0) this.pila[i] = res + "";
            else {
                if(!isNaN(this.pila[i + 1])) this.pila[i] = this.pila[i+1];
                else this.pila = this.pila.slice(0,i);
            }
        }
    }

    #params(num) {
        var count = 0;
        for(var i = 0; i < this.pila.length; i++) {
            if(!isNaN(this.pila[i])) count++;
        }
        return count >= num;
    }

    #unNumero() {
        return (!isNaN(this.nextNum) && this.nextNum != "");
    }

    #factorial(n) {
        var total = 1; 
        for (var i = 1; i <= n; i++) {
            total = total * i; 
        }
        return total; 
    }

    doShift() {
        this.isShift = !this.isShift;
        if(this.isShift) {
            document.querySelector("input[type=\"button\"][value = \"SHIFT\"]").value = "SHIFT*";
        } else {
            document.querySelector("input[type=\"button\"][value = \"SHIFT*\"]").value = "SHIFT";
        }
        if(this.isShift) {
            document.querySelector("input[type=\"button\"][value = \"sin\"]").value = "asin";
        } else {
            document.querySelector("input[type=\"button\"][value = \"asin\"]").value = "sin";
        }
        if(this.isShift) {
            document.querySelector("input[type=\"button\"][value = \"cos\"]").value = "acos";
        } else {
            document.querySelector("input[type=\"button\"][value = \"acos\"]").value = "cos";
        }
        if(this.isShift) {
            document.querySelector("input[type=\"button\"][value = \"tan\"]").value = "atan";
        } else {
            document.querySelector("input[type=\"button\"][value = \"atan\"]").value = "tan";
        }
    }
}

var calc = new CalculadoraRPN();

/*dígitos, punto, suma, resta, multiplicación, división, mrc, mMenos, mMas, borrar, igual, 
porcentaje, raíz y mas/menos (*/

