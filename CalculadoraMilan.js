class CalculadoraMilan {

    constructor() {
        this.pantalla = "0";
        this.memoriaIndependiente = Number(0);
        this.operacion = [];
        this.lastPressed = "";
        this.number = 0;
        this.simbolo = -1;
        this.valorActual = Number(0);
    }

    print() {
        document.getElementById("pantalla").value = this.pantalla;
    }

    digitos(digito) {
        if(this.operacion[this.simbolo] == "=" || this.lastPressed == "%"
            || this.lastPressed == "sqrt" || this.lastPressed == "m-" || this.lastPressed == "m+"
            || this.lastPressed == "mrc" || this.lastPressed == "+/-")
        {
            this.operacion = [];
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
            this.operacion = ["0"];
            this.number = 0;
            this.simbolo = -1;
            this.valorActual = Number(0);
            this.pantalla = "0";
        }
        if(!(this.operacion[this.number].toString()).includes("."))
        {
            this.pantalla += ".";
            this.operacion[this.number] = !isNaN(this.operacion[this.number]) ? this.operacion[this.number] + "." : ".";
            this.lastPressed = ".";
            this.print();
        }
    }

    suma() {
        this.pantalla += "+";
        this.simbolo+=2;
        this.operacion[this.simbolo] = "+";
        this.number+=2;
        this.lastPressed = "+";
        this.print();
    }

    resta() {
        this.pantalla += "-";
        this.simbolo+=2;
        this.operacion[this.simbolo] = "-";
        this.number+=2;
        this.lastPressed = "-";
        this.print();
    }

    multiplicacion() {
        this.pantalla += "x";
        this.simbolo+=2;
        this.operacion[this.simbolo] = "*";
        this.number+=2;
        this.lastPressed = "*";
        this.print();
    }

    division() {
        this.pantalla += "/";
        this.simbolo+=2;
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
            var limite = this.#getLimiteOperacion();
            var operacionActual = this.#getOperacionActual(limite);
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

    #isComputable()
    {
        if(this.operacion.length < 3) return false;
        if(this.operacion.length % 2 == 0) return false;
        for(var i = this.number; i >= 0; i-=2)
        {
            if(this.operacion[i][this.operacion[i].length - 1] == "%") ;
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

    computarOperacion(operacion)
    {
        var aComputar = "";
        for(var i = 0; i < operacion.length; i++)
        {
            aComputar += operacion[i];
        }
        return Number(eval(aComputar));
    }

    #getOperacionActual(limite)
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

    #getLimiteOperacion()
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

    borrar() {
        if(this.pantalla.length > 0)
        {
            var aux = this.pantalla.charAt(this.pantalla.length - 1)
            if(isNaN(aux) && aux != "%")
            {
                this.operacion = this.operacion.slice(0,this.operacion.lastIndexOf(this.operacion[this.simbolo]));
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
                    this.operacion[this.number] = isNaN(this.operacion[this.number]) ? 
                        Number(this.operacion[this.number].substring(0,this.operacion[this.number].length - 1)) : 
                        this.operacion[this.number] % 10;
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
        var limite = this.#getLimiteOperacion();
        var operacionActual = this.#getOperacionActual(limite);
        if(operacionActual.length == 1 && !isNaN(this.operacion[this.number]))
        {
            this.memoriaIndependiente += Number(this.operacion[this.number]);
            this.print();
        }
        this.lastPressed = "m+";
    }

    mMenos() {
        var limite = this.#getLimiteOperacion();
        var operacionActual = this.#getOperacionActual(limite);
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
        var limite = this.#getLimiteOperacion();
        var operacionActual = this.#getOperacionActual(limite);
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
        if(this.pantalla.charAt[0] == '-')
        {
            this.pantalla = this.pantalla.substring(1);
        }
        else
        {
            this.pantalla = "-(" + this.pantalla + ")";
        }
        this.lastPressed = "+/-";
        this.print();
    }
}

var calc = new CalculadoraMilan();

/*dígitos, punto, suma, resta, multiplicación, división, mrc, mMenos, mMas, borrar, igual, 
porcentaje, raíz y mas/menos (*/