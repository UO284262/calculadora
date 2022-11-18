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
                this.pantalla = this.pantalla.substring(0,this.pantalla.length - 1);
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
                    this.pantalla = this.pantalla.substring(0,this.pantalla.length - 1);
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
            this.pantalla = this.pantalla.substring(0,this.pantalla.length - 1);
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

var calc = new CalculadoraMilan();