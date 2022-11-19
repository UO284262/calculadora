class CalculadoraMilan {

    constructor() {
        this.pantalla = "0";
        this.memoriaIndependiente = Number(0);
        this.operacion = [0];
        this.lastPressed = "";
        this.number = 0;
        this.simbolo = -1;
        this.valorActual = Number(0);
        document.addEventListener('keydown', (event) => {
            this.#ejecutar(event.key);
        });
    }

    #ejecutar(char)
    {
        if(!isNaN(char))
        {
            this.digitos(char);
            return;
        }
        switch(char)
        {
            case "c": this.masMenos(); break;
            case "z": this.raiz(); break;
            case "p": this.porcentaje(); break;
            case "a": this.apagar(); break;
            case "r": this.mMenos(); break;
            case "s": this.mMas(); break;
            case "m": this.mrc(); break;
            case "Backspace": this.borrar(); break;
            case "Enter": this.igual(); break;
            case "+": this.suma(); break;
            case "-": this.resta(); break;
            case "*": this.multiplicacion(); break;
            case "/": this.division(); break;
            case ".": this.punto(); break;
        }
    }

    print() {
        document.querySelector("input[type = \"text\"]").value = this.pantalla;
    }

    iSimbolo() {
        if(this.pantalla.length == 15) return;
        this.simbolo+=2;
    }

    digitos(digito) {
        if(this.pantalla.length == 15) return;
        if(this.operacion[this.simbolo] == "=" || this.lastPressed == "%"
            || this.lastPressed == "sqrt" || this.lastPressed == "m-" || this.lastPressed == "m+"
            || this.lastPressed == "mrc" || this.lastPressed == "+/-")
        {
            this.operacion = [0];
            this.number = 0;
            this.simbolo = -1;
            this.valorActual = Number(0);
            this.pantalla = digito;
        }
        else
        {
            if(this.pantalla == "0")
            {
                this.pantalla = digito;
            }
            else
            {
                this.pantalla += digito;
            }
        }
        this.operacion[this.number] = Number(!isNaN(this.operacion[this.number]) ? this.operacion[this.number] + digito : digito);
        this.lastPressed = digito;
        this.print();
    }

    punto() {
        if(this.operacion[this.simbolo] == "=")
        {
            this.operacion = [0];
            this.number = 0;
            this.simbolo = -1;
            this.valorActual = Number(0);
            this.pantalla = "0";
        }
        if(!((this.operacion[this.number]+ "").toString()).includes("."))
        {
            this.pantalla += ".";
            this.operacion[this.number] = !isNaN(this.operacion[this.number]) ? this.operacion[this.number] + "." : ".";
            this.lastPressed = ".";
            this.print();
        }
    }

    suma() {
        this.iSimbolo();
        this.pantalla += "+";
        this.operacion[this.simbolo] = "+";
        this.number+=2;
        this.lastPressed = "+";
        this.print();
    }

    resta() {
        this.iSimbolo();
        this.pantalla += "-";
        this.operacion[this.simbolo] = "-";
        this.number+=2;
        this.lastPressed = "-";
        this.print();
    }

    multiplicacion() {
        this.iSimbolo();
        this.pantalla += "x";
        this.operacion[this.simbolo] = "*";
        this.number+=2;
        this.lastPressed = "*";
        this.print();
    }

    division() {
        this.iSimbolo();
        this.pantalla += "/";
        this.operacion[this.simbolo] = "/";
        this.number+=2;
        this.lastPressed = "/";
        this.print();
    }

    igual() {
        if(this.#isComputable())
        {
            var aux = this.valorActual;

            if(this.lastPressed == "=")
            {
                this.simbolo += 2;
                this.operacion[this.simbolo] = this.operacion[this.simbolo - 4];
                this.number += 2;
                this.operacion[this.number] = this.operacion[this.number - 4];
            }
            else if(this.operacion[this.simbolo] == "/" && !isNaN(this.operacion[this.number - 2])  && isNaN(this.operacion[this.number]))
            {
                this.operacion[this.number] = this.operacion[this.number - 2];
                this.operacion[this.number - 2] = Number(1);
                this.lastPressed = "=";
            }
            else if(this.operacion[this.simbolo] == "*" && !isNaN(this.operacion[this.number - 2])  && isNaN(this.operacion[this.number]))
            {
                this.operacion[this.number] = this.operacion[this.number - 2];
                this.operacion[this.number - 2] = Number(1);
                this.lastPressed = "=";
            }
            var limite = this.getLimiteOperacion();
            var operacionActual = this.getOperacionActual(limite);
            this.valorActual = this.#computarOperacionClasica(operacionActual);
            this.simbolo+=2;
            this.number+=2;
            this.operacion[this.simbolo] = "=";
            this.operacion[this.number] = this.valorActual;
            this.pantalla = this.valorActual;

            if(aux != this.valorActual)
            {
                this.lastPressed = "=";
            }
            this.print();
        }
    }

    computarOperacion(operacion)
    {
        var aComputar = "";
        for(var i = 0; i < operacion.length; i++)
        {
            aComputar += operacion[i];
        }
        return Number(eval(aComputar));
    }

    borrar() {
        if(this.pantalla.length > 0)
        {
            var aux = this.pantalla.charAt(this.pantalla.length - 1)
            if(isNaN(aux) && aux != "%" && aux != ".")
            {
                this.operacion = this.operacion.slice(0,this.operacion.this.operacion.length - 2);
                this.simbolo-=2;
                this.number-=2;
                this.pantalla = (this.pantalla + "").substring(0,this.pantalla.length - 1);
            }
            else
            {
                if(this.pantalla.length == 1)
                {
                    this.pantalla = 0;
                    this.operacion[this.number] = 0;
                }
                else
                {
                    if((this.operacion[this.number] + "").charAt((this.operacion[this.number] + "").length - 2) == ".") {
                        this.operacion[this.number] = (this.operacion[this.number] + "").substring(0,(this.operacion[this.number] + "").length - 1) + "";
                    }
                    else {
                        this.operacion[this.number] = Number((this.operacion[this.number] + "").substring(0,(this.operacion[this.number] + "").length - 1));
                    }
                    this.pantalla = (this.pantalla + "").substring(0,this.pantalla.length - 1);
                }
            }
            this.print();
        }
    }

    mrc() {
        var numero = this.memoriaIndependiente;
        this.operacion[this.number] = numero;
        while(!isNaN(this.pantalla[this.pantalla.length - 1]))
        {
            this.pantalla = (this.pantalla + "").substring(0,this.pantalla.length - 1);
        }
        this.pantalla += numero;
        this.lastPressed = "mrc";
        this.print();
    }

    mMas() {
        var limite = this.getLimiteOperacion();
        var operacionActual = this.getOperacionActual(limite);
        if(operacionActual.length == 1 && !isNaN(this.operacion[this.number]))
        {
            this.memoriaIndependiente += Number(this.operacion[this.number]);
            this.print();
        }
        this.lastPressed = "m+";
    }

    mMenos() {
        var limite = this.getLimiteOperacion();
        var operacionActual = this.getOperacionActual(limite);
        if(operacionActual.length == 1 && !isNaN(this.operacion[this.number]))
        {
            this.memoriaIndependiente -= Number(this.operacion[this.number]);
            this.print();
        }
        this.lastPressed = "m-";
    }

    apagar() {
        this.pantalla = "0";
        this.print();
        this.operacion = [];
        this.operacion = [];
        this.number = 0;
        this.simbolo = -1;
        this.lastPressed = "";
        this.memoriaIndependiente = Number(0);
    }

    porcentaje() {
        if(!isNaN(this.operacion[this.number]) && this.operacion.length >= 3 && this.operacion[this.simbolo] != "=")
        {
            this.operacion[this.number] += "%";
            this.pantalla += "%";
            this.print();
        }
        this.lastPressed = "%";
    }

    raiz() {
        var limite = this.getLimiteOperacion();
        var operacionActual = this.getOperacionActual(limite);
        if(operacionActual.length == 1)
        {
            this.operacion[this.number] = Number(Math.sqrt(this.operacion[this.number]));
            this.valorActual = this.operacion[this.number];
            this.pantalla = this.valorActual;
            this.print();
        }
        this.lastPressed = "sqrt";
    }

    masMenos() {
        var limite = this.getLimiteOperacion();
        var operacionActual = this.getOperacionActual(limite);
        if(operacionActual.length == 1)
        {
            this.operacion[this.number] = this.operacion[this.number] * -1;
            this.pantalla = this.operacion[this.number];
            this.lastPressed = "+/-";
            this.print();
        }
    }

    #isComputable()
    {
        if((this.operacion[this.simbolo] == "/" || this.operacion[this.simbolo] == "*")&& !isNaN(this.operacion[this.number - 2])) return true;
        if(this.operacion.length < 3) return false;
        if(this.operacion.length % 2 == 0) return false;
        for(var i = this.number; i >= 0; i-=2)
        {
            if(isNaN(this.operacion[i]) && this.operacion[i].includes("%")) ;
            else if(isNaN(this.operacion[i])) return false;
        }
        return true;
    }

    #computarOperacionClasica(operacionActual)
    {
        var resultado = 0;
        for(var i = 0; i < operacionActual.length; i+=2)
        {
            if(i == 0)
            {
                resultado = this.computarOperacion([operacionActual[0]]);
            }
            else if(isNaN(operacionActual[i]) && operacionActual[i][operacionActual[i].length - 1] == "%")
            {
                var valorPorcentaje = Number(operacionActual[i].substring(0,operacionActual[i].length - 1));
                switch(operacionActual[i-1])
                {
                    case "*": resultado = this.computarOperacion([resultado,"*",valorPorcentaje,"/",100]); break;
                    case "/": resultado = this.computarOperacion([resultado,"/",valorPorcentaje,"*",100]); break;
                    default: resultado = this.computarOperacion([resultado,operacionActual[i-1],resultado,"*",valorPorcentaje,"/",100]); break;
                }
            }
            else
            {
                resultado = this.computarOperacion([resultado,operacionActual[i-1],operacionActual[i]])
            }
        }
        return resultado;
    }

    getOperacionActual(limite)
    {
        var inicio = limite + 1;
        var operacionActual = [];
        var count = inicio;
        while(count < this.operacion.length)
        {
            operacionActual[count - inicio] = isNaN(this.operacion[count]) ? this.operacion[count] : Number(this.operacion[count]);
            count+=2;
        }
        count = inicio + 1;
        while(count < this.operacion.length)
        {
            operacionActual[count - inicio] = this.operacion[count];
            count += 2;
        }
        return operacionActual;
    }

    getLimiteOperacion()
    {
        var limite = -1;
        for(var i = this.operacion.length - 1; i > 0; i--)
        {
            if(this.operacion[i] == "=")
            {
                limite = i;
                break;
            }
        }
        return limite;
    }
}
class CalculadoraCientifica extends CalculadoraMilan{

    constructor() {
        super();
        this.lParentesis = [];
        this.nParentesis = 0;
        this.preNum = 0;
        this.lastNum = 0;
        this.pantalla = "";
        this.isShift = false;
        this.preNums = [0];
        this.rad = false;
        this.hyp = false;
        this.fe = false;
    }

    digitos(digito) {
        if(this.pantalla.length == 15) return;
        if(this.isShift) this.doShift();
        if(this.hyp) this.doHyp();
        if(this.operacion[this.simbolo] == "=" || this.lastPressed == "%"
            || this.lastPressed == "sqrt" || this.lastPressed == "m-" || this.lastPressed == "m+"
            || this.lastPressed == "mrc" || this.lastPressed == "+/-" || this.lastPressed == "10^"
            || this.lastPressed == "!" || this.lastPressed == "sin" || this.lastPressed == "cos"
            || this.lastPressed == "tan" || this.lastPressed == "log" || this.lastPressed == "mg"
            || this.lastPressed == "mc" || this.lastPressed == "fe")
        {
            this.operacion = [0];
            this.number = 0;
            this.simbolo = -1;
            this.valorActual = Number(0);
            this.pantalla = digito + "";
            this.operacion[this.number] = Number(!isNaN(this.operacion[this.number]) ? this.operacion[this.number] + digito : digito);
        }
        else if(this.lastPressed == ".") {
            this.pantalla += digito + "";
            if(this.operacion[this.number] == 0) {
                this.operacion[this.number] = Number("0." + digito);
            }
            else
            {
                this.operacion[this.number] = Number(this.operacion[this.number] + digito);
            }
        }
        else
        {
            if(this.operacion[this.number] == 0)
            {
                this.pantalla = (this.pantalla + "").substring(0,this.preNums[this.preNum]);
                this.pantalla += digito +"";
            }
            else
            {
                this.pantalla += digito;
            }
            this.operacion[this.number] = Number(!isNaN(this.operacion[this.number]) ? this.operacion[this.number] + digito : digito);
        }
        this.lastPressed = digito;
        this.print();
        this.lastNum = this.operacion[this.number];

    }

    toFE() {
        this.fe = !this.fe;
        if(this.fe) {
            document.querySelector("input[type=\"button\"][value = \"F-E\"]").value = "F-E*";
        } else {
            document.querySelector("input[type=\"button\"][value = \"F-E*\"]").value = "F-E";
        }
        if(this.fe && !isNaN(this.operacion[this.number])) {
            this.pantalla = (this.pantalla + "").substring(0,this.preNums[this.preNum])
            this.pantalla += this.operacion[this.number].toExponential();
        } else if(!isNaN(this.operacion[this.number])){
            this.pantalla = (this.pantalla + "").substring(0,this.preNums[this.preNum])
            this.pantalla += this.operacion[this.number].toFixed();
        }
        this.lastPressed = "fe";
        this.print();
    }

    degRad() {
        this.rad = !this.rad;
        if(this.rad) {
            document.querySelector("input[type=\"button\"][value = \"DEG\"]").value = "RAD";
        } else {
            document.querySelector("input[type=\"button\"][value = \"RAD\"]").value = "DEG";
        }
    }

    iSimbolo() {
        super.iSimbolo();
        this.preNum++;
        this.preNums[this.preNum] = this.pantalla.length +1;
        if(this.isShift) this.doShift();
        if(this.hyp) this.doHyp();
    }

    punto() {
        if(this.operacion[this.simbolo] == "=")
        {
            this.operacion = [0];
            this.number = 0;
            this.simbolo = -1;
            this.valorActual = Number(0);
            this.pantalla = "0.";
        }
        if(!((this.operacion[this.number]+ "").toString()).includes("."))
        {
            this.pantalla = this.operacion[this.number] == 0 ? (this.pantalla + "").substring(0,this.pantalla.length - 1) + "0." : this.pantalla + ".";
            this.operacion[this.number] = !isNaN(this.operacion[this.number]) ? this.operacion[this.number] + "." : ".";
            this.lastPressed = ".";
            this.print();
        }
    }

    sParentesis() {
        if(this.pantalla == "0") {
            this.pantalla = "";
        }
        if(!isNaN(this.operacion[this.operacion.length - 1])) {
            this.pantalla = (this.pantalla + "").substring(0,this.preNums[this.preNum]);
            this.pantalla += "(" + this.lastNum;
        }
        else {
            this.pantalla+="(";
        }
        this.lParentesis[this.nParentesis] = this.simbolo;
        this.nParentesis++;
        this.lastPressed = "(";
        this.print();
    }

    eParentesis() {
        if(!isNaN(this.operacion[this.operacion.length - 1]) && this.nParentesis > 0) {
            this.#computarParentesis(this.lParentesis[this.nParentesis - 1] + 1);
            this.nParentesis--;
            this.lastPressed = ")";
            this.pantalla+=")";
            this.print();
        }
    }

    #computarParentesis(start) {
        var operacionParentesis = this.operacion.slice(start);
        var valorParentesis = this.computarOperacion(operacionParentesis);
        this.operacion[start] = valorParentesis;
        this.operacion = this.operacion.slice(0,start + 1);
        this.simbolo = start - 1;
        this.number = start;
    }

    igual() {
        if(this.operacion.length == 1)
        {
            this.pantalla = this.operacion[this.number] + "";
            this.lastNum = this.valorActual;
            this.preNum = 0;
            this.preNums = [0];
            this.print();
            return;
        }
        if(this.#isComputable())
        {
            var aux = this.valorActual;

            if(this.lastPressed == "=")
            {
                this.simbolo += 2;
                this.operacion[this.simbolo] = this.operacion[this.simbolo - 4];
                this.number += 2;
                this.operacion[this.number] = this.operacion[this.number - 4];
            }
            else if(this.operacion[this.simbolo] == "/" && !isNaN(this.operacion[this.number - 2]) && isNaN(this.operacion[this.number]))
            {
                this.operacion[this.number] = this.operacion[this.number - 2];
                this.operacion[this.number - 2] = Number(1);
                this.lastPressed = "=";
            }
            else if(this.operacion[this.simbolo] == "*" && !isNaN(this.operacion[this.number - 2]) && isNaN(this.operacion[this.number]))
            {
                this.operacion[this.number] = this.operacion[this.number - 2];
                this.operacion[this.number - 2] = Number(1);
                this.lastPressed = "=";
            }
            var limite = this.getLimiteOperacion();
            var operacionActual = this.getOperacionActual(limite);
            this.valorActual = this.computarOperacion(operacionActual);
            this.simbolo+=2;
            this.number+=2;
            this.operacion[this.simbolo] = "=";
            this.operacion[this.number] = this.valorActual;
            this.pantalla = this.fe? Number(this.valorActual.toExponential(10)) : Number(this.valorActual.toFixed(10));
            this.lastNum = this.valorActual;
            this.preNum = 0;
            this.preNums = [0];

            if(aux != this.valorActual)
            {
                this.lastPressed = "=";
            }
            this.print();
        }
    }

    computarOperacion(operacion)
    {
        var aComputar = "";
        for(var i = 0; i < operacion.length; i++)
        {
            if(operacion[i+1] == "exp")
            {
                operacion[i] = Number(operacion[i] * Math.pow(10,operacion[i+2]));
                aComputar += operacion[i];
                i+=2;
            }
            else {
                aComputar += operacion[i];
            }
        }
        return Number(eval(aComputar));
    }

    borrarPlus() {
        if(!isNaN(this.operacion[this.operacion.length - 1]) || (this.operacion[this.operacion.length - 1] +"").includes("."))
        {
            if(this.fe) {
                this.toFE();
            }
            if(isNaN(this.operacion[this.operacion.length - 1])) {
                this.pantalla = (this.pantalla + "").substring(0,this.pantalla.length);
                this.simbolo-=2;
                this.number-=2;
            }
            else {
                this.pantalla = (this.pantalla + "").substring(0,this.preNums[this.preNum])
            }
            this.operacion = this.operacion.slice(0,this.operacion.length - 1);
            this.print();
            this.lastPressed = "";
        }
    }

    borrar() {
        if(this.fe) {
            this.toFE();
        }
        if(this.lastPressed == "=") {
            this.cerrar();
        }
        if(this.pantalla.length > 0)
        {
            var aux = this.pantalla.charAt(this.pantalla.length - 1)
            if(aux == "(") {
                this.pantalla = (this.pantalla + "").substring(0,this.pantalla.length - 1);
                this.nParentesis--;
            }
            else if(aux == ")") {
                while(aux != "(") {
                    this.pantalla = (this.pantalla + "").substring(0,this.pantalla.length - 1);
                    aux = this.pantalla.charAt(this.pantalla.length - 1);
                }
                this.pantalla = (this.pantalla + "").substring(0,this.pantalla.length - 1);
                this.operacion = this.operacion.slice(0,this.number);
                this.preNum--;
            }
            else if(isNaN(aux) && aux != "%" && aux != ".")
            {
                this.operacion = isNaN(this.operacion[this.number-2]) ? this.operacion.slice(0,this.operacion.length - 2) : this.operacion.slice(0,this.operacion.length - 1);
                this.simbolo-=2;
                this.number-=2;
                this.preNum--;
                this.pantalla = (this.pantalla + "").substring(0,this.pantalla.length - 1);
            }
            else
            {
                if(this.pantalla.length == 1)
                {
                    this.pantalla = "";
                    this.operacion[this.number] = 0;
                    this.lastNum = 0;
                }
                else
                {
                    if((this.operacion[this.number] + "").charAt((this.operacion[this.number] + "").length - 2) == ".") {
                        this.operacion[this.number] = (this.operacion[this.number] + "").substring(0,(this.operacion[this.number] + "").length - 1) + "";
                    }
                    else {
                        this.operacion[this.number] = Number((this.operacion[this.number] + "").substring(0,(this.operacion[this.number] + "").length - 1));
                    }
                    this.lastNum = this.operacion[this.number];
                    this.pantalla = (this.pantalla + "").substring(0,this.pantalla.length - 1);
                }
            }
            this.print();
        }
        this.lastPressed = "";
    }

    mrc() {
        var numero = this.memoriaIndependiente;
        this.operacion[this.number] = numero;
        while(!isNaN(this.pantalla[this.pantalla.length - 1]))
        {
            this.pantalla = (this.pantalla + "").substring(0,this.pantalla.length - 1);
        }
        this.pantalla += numero;
        this.lastPressed = "mrc";
        this.print();
    }

    mReset() {
        this.memoriaIndependiente = 0;
        this.lastPressed = "mc";
    }

    mMas() {
        var limite = this.getLimiteOperacion();
        var operacionActual = this.getOperacionActual(limite);
        if(operacionActual.length == 1 && !isNaN(this.operacion[this.number]))
        {
            this.memoriaIndependiente += Number(this.operacion[this.number]);
            this.print();
        }
        this.lastPressed = "m+";
    }

    mGuardar() {
        var limite = this.getLimiteOperacion();
        var operacionActual = this.getOperacionActual(limite);
        if(operacionActual.length == 1 && !isNaN(this.operacion[this.number])) {
            this.memoriaIndependiente = Number(this.operacion[this.number]);
            this.print();
        }
        this.lastPressed = "mg";
    }

    mMenos() {
        var limite = this.getLimiteOperacion();
        var operacionActual = this.getOperacionActual(limite);
        if(operacionActual.length == 1 && !isNaN(this.operacion[this.number]))
        {
            this.memoriaIndependiente -= Number(this.operacion[this.number]);
            this.print();
        }
        this.lastPressed = "m-";
    }

    apagar() {
        this.cerrar();
        this.pantalla = "";
        this.print();
        this.memoriaIndependiente = Number(0);
    }

    cerrar() {
        if(this.rad) this.degRad();
        if(this.hyp) this.doHyp();
        if(this.fe) this.toFE();
        this.lParentesis = [];
        this.nParentesis = 0;
        this.lastNum = 0;
        this.preNum = 0;
        this.preNums = [0];
        this.operacion = [0];
        this.number = 0;
        this.simbolo = -1;
        this.lastPressed = "";
    }

    doHyp() {
        this.hyp = !this.hyp;
        if(this.hyp) {
            document.querySelector("input[type=\"button\"][value = \"HYP\"]").value = "HYP*";
        } else {
            document.querySelector("input[type=\"button\"][value = \"HYP*\"]").value = "HYP";
        }
    }

    raiz() {
        this.operacion[this.number] = Math.sqrt(this.operacion[this.number]);
        this.pantalla = (this.pantalla + "").substring(0,this.preNums[this.preNum]);
        this.pantalla += this.operacion[this.number] + "";
        this.lastPressed = "sqrt";
        this.print();
    }

    masMenos() {
        this.operacion[this.number] = this.operacion[this.number] * -1;
        this.pantalla = (this.pantalla + "").substring(0,this.preNums[this.preNum]);
        this.pantalla += this.operacion[this.number] + "";
        this.lastPressed = "+/-";
        this.print();
    }

    doShift() {
        this.isShift = ! this.isShift;
        if(this.isShift) {
            document.querySelector("input[type=\"button\"][value = \"SHFT\"]").value = "SHFT*";
        } else {
            document.querySelector("input[type=\"button\"][value = \"SHFT*\"]").value = "SHFT";
        }
    }

    doFactorial() {
        this.operacion[this.number] = this.#factorial(this.operacion[this.number]);
        this.pantalla = (this.pantalla + "").substring(0,this.preNums[this.preNum]);
        this.pantalla += this.operacion[this.number] + "";
        this.lastPressed = "!";
        this.print();
    }

    sin() {
        var valor = !this.rad && !this.isShift? Number(this.operacion[this.number]/360 * 2*Math.PI) : this.operacion[this.number];
        var res = Math.round((this.isShift? (this.hyp? Math.sinh(valor) : Math.asin(valor)) : (this.hyp? Math.sinh(valor) : Math.sin(valor)))*1000000000)/1000000000;
        this.operacion[this.number] = Math.round((this.isShift && !this.rad?  Number(res/Math.PI * 180) : res)*100000)/100000;
        this.pantalla = (this.pantalla + "").substring(0,this.preNums[this.preNum]);
        this.pantalla += this.operacion[this.number] + "";
        this.lastPressed = "sin";
        if(this.isShift) this.doShift();
        if(this.hyp) this.doHyp();
        this.print();
    }

    cos() {
        var valor = !this.rad && !this.isShift? Number(this.operacion[this.number]/360 * 2*Math.PI) : this.operacion[this.number];
        var res = Math.round((this.isShift? (this.hyp? Math.cosh(valor) : Math.acos(valor)) : (this.hyp? Math.cosh(valor) : Math.cos(valor)))*1000000000)/1000000000;
        this.operacion[this.number] = Math.round((this.isShift && !this.rad?  Number(res/Math.PI * 180) : res)*100000)/100000;
        this.pantalla = (this.pantalla + "").substring(0,this.preNums[this.preNum]);
        this.pantalla += this.operacion[this.number] + "";
        this.lastPressed = "cos";
        if(this.isShift) this.doShift();
        if(this.hyp) this.doHyp();
        this.print();
    }

    tan() {
        var valor = !this.rad && !this.isShift? Number(this.operacion[this.number]/360 * 2*Math.PI) : this.operacion[this.number];
        var res = Math.round((this.isShift? (this.hyp? Math.tanh(valor) : Math.atan(valor)) : (this.hyp? Math.tanh(valor) : Math.tan(valor)))*1000000000)/1000000000;
        this.operacion[this.number] = Math.round((this.isShift && !this.rad?  Number(res/Math.PI * 180) : res)*100000)/100000;
        this.pantalla = (this.pantalla + "").substring(0,this.preNums[this.preNum]);
        this.pantalla += this.operacion[this.number] + "";
        this.lastPressed = "tan";
        if(this.isShift) this.doShift();
        if(this.hyp) this.doHyp();
        this.print();
    }

    square() {
        this.operacion[this.number] = Number(eval(this.operacion[this.number] * this.operacion[this.number]));
        this.pantalla = (this.pantalla + "").substring(0,this.preNums[this.preNum]);
        this.pantalla += this.operacion[this.number] + "";
        this.lastPressed = "square";
        this.print();
    }

    potencia() {
        this.iSimbolo();
        this.pantalla += "^";
        this.operacion[this.simbolo] = "**";
        this.number+=2;
        this.lastPressed = "^";
        this.print();
    }

    modulo() {
        this.iSimbolo();
        this.pantalla += "m";
        this.operacion[this.simbolo] = "%";
        this.number+=2;
        this.lastPressed = "m";
        this.print();
    }
    logaritmo() {
        this.operacion[this.number] = Math.log(this.operacion[this.number]);
        this.pantalla = (this.pantalla + "").substring(0,this.preNums[this.preNum]);
        this.pantalla += this.operacion[this.number] + "";
        this.lastPressed = "log";
        this.print();
    }
    exponente() {
        this.iSimbolo();
        this.pantalla += "e";
        this.operacion[this.simbolo] = "exp";
        this.number+=2;
        this.lastPressed = "exp";
        this.print();
    }
    potencia10() {
        this.operacion[this.number] = Math.pow(10,this.operacion[this.number]);
        this.pantalla = (this.pantalla + "").substring(0,this.preNums[this.preNum]);
        this.pantalla += this.operacion[this.number] + "";
        this.lastPressed = "10^";
        this.print();
    }
    #isComputable()
    {
        if(this.nParentesis > 0) return false;
        if((this.operacion[this.simbolo] == "/" || this.operacion[this.simbolo] == "*")&& !isNaN(this.operacion[this.number - 2])) return true;
        if(this.operacion.length < 3) return false;
        if(this.operacion.length % 2 == 0) return false;
        for(var i = this.number; i >= 0; i-=2)
        {
            if(isNaN(this.operacion[i]) && this.operacion[i].includes("%")) ;
            else if(isNaN(this.operacion[i])) return false;
        }
        return true;
    }

    #factorial(n) {
        var total = 1; 
        for (var i = 1; i <= n; i++) {
            total = total * i; 
        }
        return total; 
    }
}

var calc = new CalculadoraCientifica();

/*dígitos, punto, suma, resta, multiplicación, división, mrc, mMenos, mMas, borrar, igual, 
porcentaje, raíz y mas/menos (*/

