class CalculadoraRPN {
    constructor() {
        this.pila = [];
        this.nextPila = 0;
        this.nextNum = "";
        this.isShift = false;
        this.fromPila = 0;
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
            case "ArrowUp": this.masPila(); break;
            case "ArrowDown": this.menosPila(); break;
        }
    }

    print() {
        for(var i = 0; i <= this.pila.length; i++) {
            if(i <= 10){
                document.querySelector("input[name = \"linea" + i+ "\"]").value = i == this.nextPila? this.nextNum : this.pila[i - 1 + this.fromPila];
                document.querySelector("label[for = \"linea" + (i) + "\"]").textContent = i == this.nextPila? "Next:" : i + this.fromPila + "";
            }
        }
        for(var i = this.pila.length + 1 - this.fromPila; i <= 10 + this.fromPila; i++) {
            document.querySelector("input[name = \"linea" + i+ "\"]").value = "";
            document.querySelector("label[for = \"linea" + (i) + "\"]").textContent = i == this.nextPila? "Next:" : i + this.fromPila + "";
        }
        if(this.pila.length >  this.fromPila + 10) {
            document.querySelector("label[for = \"linea10\"]").textContent = this.fromPila + 10 + " ^";
        } else {
            document.querySelector("label[for = \"linea10\"]").textContent = this.fromPila + 10 + "";
        }
    }

    operacionBinaria(operando) {
        if(this.params(2)) {
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
            this.dosPorUno(res);
            this.print();
        }
        if(this.isShift) this.doShift();
    }

    operacionUnaria(operando) {
        if(this.params(1))
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
                case "sqrt": res = Math.sqrt(op1); break;
                case "!": if(op1 > 0) res = Number(this.factorial(op1)); break;
                case "ln": if(op1 > 0) res = Math.log(op1); break;
            }
            this.pila[0] = res;
            this.print();
        }
        if(this.isShift) this.doShift();
    }

    enter() {
        if(this.#unNumero()) {
            this.unoMas(this.nextNum);
            this.nextNum = "";
            this.print();
        }
    }

    borrar() {
        this.nextNum = "";
        this.print();
    }

    masPila() {
        if(this.fromPila < this.pila.length - 10)
            this.fromPila++;
            this.print();
    }

    menosPila() {
        if(this.fromPila > 0){
            this.fromPila--;
            this.print();
        }
    }

    apagar() {
        if(this.isShift) this.doShift();
        this.pila = [];
        this.nextPila = 0;
        this.nextNum = "";
        this.isShift = false;
        this.fromPila = 0;
        this.print();
    }

    raiz() {
        this.operacionUnaria("sqrt");
    }

    punto() {
        if(!(this.nextNum + "").includes("."))
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
        if(digito == "0" && this.nextNum == "0") return;
        else
        {
            this.nextNum = this.nextNum + "" + digito;
            this.print();
            if(this.isShift) this.doShift();
        }
    }

    masMenos() {
        this.nextNum = (Number(this.nextNum) * -1) + "";
        this.print();
    }

    PI() {
        if(this.nextNum == "") {
            this.digito(Math.PI);
            this.enter();
        }
    }

    E() {
        if(this.nextNum == "") {
            this.digito(Math.E);
            this.enter();
        }
    }

    unoMas(res) {
        var aux = this.pila.length;
        for(var i = aux; i > 0; i--) {
            this.pila[i] = this.pila[i - 1]
        }
        this.pila[0] = res;
    }

    dosPorUno(res) {
        for(var i = 0; i < this.pila.length; i++) {
            if(i == 0) this.pila[i] = res + "";
            else {
                if(!isNaN(this.pila[i + 1])) this.pila[i] = this.pila[i+1];
                else this.pila = this.pila.slice(0,i);
            }
        }
    }

    params(num) {
        var count = 0;
        for(var i = 0; i < this.pila.length; i++) {
            if(!isNaN(this.pila[i])) count++;
        }
        return count >= num;
    }

    #unNumero() {
        return (!isNaN(this.nextNum) && this.nextNum != "");
    }

    factorial(n) {
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

class CalculadoraEspecializada extends CalculadoraRPN{
    constructor() {
        super();
        this.isCoor = false;
    }

    operacionBinaria(operando) {
        if(this.params(2)) {
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
            this.dosPorUno(res);
            this.print();
        }
        if(this.isShift) this.doShift();
    }

    operacionUnaria(operando) {
        if(this.params(1))
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
                case "sqrt": res = Math.sqrt(op1); break;
                case "!": if(op1 > 0) res = Number(this.factorial(op1)); break;
                case "ln": if(op1 > 0) res = Math.log(op1); break;
            }
            this.pila[0] = res;
            this.print();
        }
        if(this.isShift) this.doShift();
    }

    operacionCuaternaria(operando) {
        if(this.params(4)) {
            var op1 = this.pila[3];
            var op2 = this.pila[2];
            var op3 = this.pila[1];
            var op4 = this.pila[0];
            var res = 0;
            switch(operando) {
                case "dkm": res = Math.round(this.#calcularDistancia(op1,op2,op3,op4)  * 1.609344 * 100)/100; break;
                case "dmi": res = Math.round(this.#calcularDistancia(op1,op2,op3,op4) * 100)/100; break;
            }
            this.#cuatroPorUno(res);
            this.print();
        }
        if(this.isShift) this.doShift();
    }

    distancia(unit) {
        if(this.params(4) && this.isCoor)
        {
            for(var i = 0; i < 4; i++) {
                if((i == 2 || i == 0) && (this.pila[i] > 180 || this.pila[i] < -180)) return;
                else if((i == 1 || i == 3) && (this.pila[i] > 90 || this.pila[i] < -90)) return;
            } 
            if(unit == "D(km)") this.operacionCuaternaria("dkm");
            else if(unit == "D(mi)") this.operacionCuaternaria("dmi");
        }
    }

    husoHorario() {
        if(this.params(2)) {
            if(this.isCoor) {
                var lat = this.pila[1];
                var lon = this.pila[0];
                var res = "";
                var huso = Math.floor((Number(lon) + 7.5) / 15);
                res = "GMT" + (huso == 0? "" : huso > 0 ? "+" + huso : huso);
                this.nextNum = res;
            }
        }
        this.print();
    }

    #calcularDistancia(lat1,lon1,lat2,lon2) {
        var lon1 = this.pila[3];
        var lon2 = this.pila[1];
        var lat1 = this.pila[2];
        var lat2 = this.pila[0];
        var lonDis = lon1 - lon2;

        var distance = 60 * 1.1515 * this.#rad2deg(
            Math.acos(
            (Math.sin(this.#deg2rad(lat1)) * Math.sin(this.#deg2rad(lat2))) + 
            (Math.cos(this.#deg2rad(lat1)) * Math.cos(this.#deg2rad(lat2)) * Math.cos(this.#deg2rad(lonDis)))))
        return (distance);   
    }

    #rad2deg(radians) {
        var degrees = radians * 180 / Math.PI;
        return degrees
    }

    modoCoor() {
        this.isCoor = !this.isCoor;
        if(this.isCoor) {
            document.querySelector("input[type=\"button\"][value = \"CR\"]").value = "CR*";
        } else {
            document.querySelector("input[type=\"button\"][value = \"CR*\"]").value = "CR";
        }
    }
        
    localizacion() {
        if(this.params(2)) {
            if(this.isCoor) {
                var lat = this.pila[1];
                var lon = this.pila[0];
                var res = "";
                if(lat >= 36 && lat <= 44 && lon >= -10 && lon <= 5){
                    res = "ESPAÑA";
                } else if(lat < -67) {
                    res = "ANTARTIDA";
                } else if((lat < 36 && lat >= 0 && lon > -30 && lon < 60) || 
                        (lat < 0 && lat > -40 && lon > 10 && lon < 50)) {
                    res = "AFRICA";
                } else if((lat < 80 && lat > 40 && lon >= 40) || 
                        (lat < 40 && lat > 0 && lon > 60 && lon < 140)) {
                    res = "ASIA";
                } else if(lat < 0 && lat > -50 && lon > 100) {
                    res = "OCEANÍA"
                } else if(lat > 36 && lat < 75 && lon > -20 && lon < 40) {
                    res = "EUROPA";
                } else if((lat > -60 && lat < 10 && lon > -80 && lon < -30) ||
                        (lat < 40 && lat > 10 && lon > -130 && lon < -60) ||
                        (lat > 40 && lat < 60 && lon < -50) || (lat > 60 && lon < -20)) {
                    res = "AMERICA";
                } else {
                    res = "OCÉANO";
                }
                this.nextNum = res;
            }
        }
        this.print();
    }

    #deg2rad(degrees) {
        var radians = degrees * Math.PI / 180;
        return radians
    }   

    #cuatroPorUno(res) {
        this.dosPorUno(res);
        this.dosPorUno(res);
        this.dosPorUno(res);
    }

    apagar() {
        if(this.isShift) this.doShift();
        this.pila = [];
        this.nextPila = 0;
        this.nextNum = "";
        this.isShift = false;
        this.fromPila = 0;
        if(this.isCoor) this.modoCoor();
        this.print();
    }
}

var calc = new CalculadoraEspecializada();

