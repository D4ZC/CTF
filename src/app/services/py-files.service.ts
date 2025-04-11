import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PyFilesService {
  private files: { [key: number]: string } = {
    1: `#!/usr/bin/python3
################################################################################
# Python script which just prints the flag
################################################################################

flag = 'py7h0n_b3g1n'
print(flag)`,
    2: `#En los humanos, la pubertad llega al cabo de una década.
# Pero los tiburones de Groenlandia tienen que esperar más de 100 años.
# Una infancia de un siglo puede parecer cosa de ciencia ficción,
# pero se explica cuando entendemos que los tiburones de Groenlandia son los vertebrados más longevos de la Tierra,
# con una esperanza de vida de unos 400 años. Estos peces pasan siglos buceando en las profundidades
# de las gélidas aguas del Ártico y el Atlántico Norte, donde alcanzan tamaños descomunales al crecer aproximadamente un centímetro al año.
# Los tiburones de Groenlandia más grandes pueden ser más largos que un Toyota Prius y pesar más de 1000 kg.
valores_codificados = [
    67, 104, 48, 99, 48, 76, 52, 116, 69, 49
]
#Normalmente, un animal no puede envejecer tanto.
# Con el tiempo, el deterioro de las funciones corporales y enfermedades como el cáncer se acumulan
# y pasan factura.  Sin embargo, el tiburón de Groenlandia parece desafiar este patrón,
# lo que significa que debe haber desarrollado herramientas genéticas para evitar las enfermedades relacionadas con la edad.
# def mostrar_mensaje_oculto():
#     mensaje_decodificado = ''.join([chr(codigo) for codigo in valores_codificados])
#     print(mensaje_decodificado)
#Recientemente, la comunidad científica ha obtenido nuevas pistas genéticas sobre su longevidad.
# Y aunque los nuevos descubrimientos no se traducirán en que los seres humanos podamos vivir hasta los 400 años,
# ofrecen a la comunidad científica tentadores modelos de cómo podríamos ser capaces de mantener la salud durante más tiempo.
if __name__ == "__main__":
    mostrar_mensaje_oculto()`,
    3: `# A number guessing game with multiple errors to fix
import random
number="D3l1c1a7uFf"
def generate_secret_number()
    # Error 1: Missing colon after function definition
    return random.randint(1, 100
def get_user_guess():
    # Error 2: Trying to convert input directly to int without handling exceptions
    guess = int(input("Guess a number between 1 and 100: "))
    return guess
def check_guess(guess, secret):
    # Error 3: Logical error in comparison
    if guess = secret:
        print("Congratulations! You guessed the number!")
        return True
    elif guess < secret
        # Error 4: Missing colon in elif statement
        print("Too low! Try again.")
        return False
    else:
        print("Too high! Try again.")
        # Error 5: Missing return statement
def calculate_score(attempts):
    # Error 6: Division by zero possibility
    score = 1000 / attempts
    return score
def main():
    print("Welcome to the Number Guessing Game!")
    print("I'm thinking of a number between 1 and 100.")
    secret_number = generate_secret_number()
    attempts = 0
    guessed_correctly = False
    # Error 7: Infinite loop potential (no break condition)
    while not guessed_correctly:
        try:
            guess = get_user_guess()
            attempts += 1
            # Error 8: Variable name mismatch
            guessed_correctly = check_guess(guess, secrt_number)
        except ValueError:
            # Error 9: Indentation error
        print("Please enter a valid number!")
        except Exception as e:
            # Error 10: Incorrect exception handling
            print("An error occurred: " + e)
    # Error 11: Trying to use a variable before it's defined
    print(f"Your final score is: {number}")
    # Calculate and display the score
    score = calculate_score(attempts)
    print(f"You guessed the number in {attempts} attempts.")
    print(f"Your score is: {score}")
# Error 12: Incorrect way to call the main function
main`,
    4: `convertme.py
imort base64
#ZXN0YSBubyBlcyB4ZA==
def main(:#cuhviuhsuhfdshfudsjfidbvyudvf hvbvjsoijv
    print(Bienvenido al sistema de verificación)#aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaddyfgidgyugfiudhfiuhdsoifyffjoijoidpjoin
 #bG8gZXN0YXMgY29uc2lndWllbmRvIDd3Nw==
    # Y2FsaWVudGUgY2FsaWVudGUgfnd+
    c_b64 = "Y29udmllcnRl"#jdusahfuhgiydufiufiydgourjsguds
#eXl5eXl5eSB0ZSBkaXLpIGFsZ28gZWwgbml2ZWwgNiBsbG9yYXJhcyBzYW5ncmU=
    #Tm8gdGUgbWUgdHJhdW1lcyBjb24gZXN0ZSBlamVyY2ljaW8gdGEgZuFjaWwgb3dvIHR1IHRlIHBvbmVzIGRpZu1jaWwgPX49
    cod = input("Por favor, ingrese el código de acceso que se encuentra escrito en el codigo: ")#ijdoijfoisfodufiapfuoidhgjbvyuhahfiudshv
 #   VHdUIE15IGJhYnksbXkgYmFieSAoZWwgcGl0ZWtvIG5vIHNhYmUp
    #VGliaW8gVGliaW8geWEgZXN0YXMgY2VyY2E=
    try#UYYYY LE BIEN
        # UXVpZXJlcyBxdWUgdGUgY3VlbnRlIHVuIGNoaXN0ZT8vOjM=
        c_deco = base64.b64decode(cod).decode('utf-8')#esto? no se si importa tal vez si no me acuerdo la verdad
        #Qm9ycmFyIGNvcnJlb3Mgbm8gZGVzZWFkb3MgZXMgZuFjaWwuLi4uIFNQQU0gY29taWRvIFhEIGphamFuc2phbmphbg==
        # SmEhIG5vIGVzdGEgYWNhIGxlZSBiaWVuIGVsIGNvZGlnbyBYRA==
        if c_deco = "convierte":#MGYG estubo aca chingao tine dos == no seas
            #YnVlbm8sIGJ1ZW5vIGVzdGUgZXMgZWwgY29kaWdvIGRlIGFjY2VzbyBZMjl1ZG1sbGNuUmw=
            cdonu = "T1r4m1sU9Xx"#todo esta en base 64 ooooo tal vez noooo? quien sabe descubrelo
            #MTI0NiBub3NlIHR1IHBlaW5zYWxlIDpw
            # RWwgY29naWdvIGRlIGFjY2VzbyBlcyBjb252aWVydGUgZW4gYmFzZTY0
            # WWEgdGUgbGEgZGkgPjoidiC/UVVFIE1BUyBRVUlFUkVTPw==
            #RGFtZSBkb3MgNjQgdHJlcyB1biBIRVhhZ29ubyA6Mw==
            #UmVhbG1lbnRlIHRlIGVzdOEgY29tcGxpY2FuZG8gbGEgdmlkYSA6bA==
            #VGhlIEZsYWcgaXM6IFBpY29jdGYobjBfM3MtNFF1MV8xZDEwdDRd
            #dHJhbGFsZXJvIHRyYWxhbGEgcG9yY29hZGlsIHBvcmNvYWxhLCB0dW0gdHVtIHR1bSBzaGF1cg==
            #dW5hbnNlIGEgbGEgc2VjdGEgZGUgeW9vbmdpIG1hbmRhcmluYSBtdWFqYWpqIA==
            #aG9sYQ0K
            #bGFncmltYXMgZGUgY29jb2RyaWxvb28gdXVoaGhoaHVoaGhoaGg=
            #WWEgbGxlZ2Fyb24gbGFzIHBpcHNoYXNoIGxvbA==
            print("¡Código correcto! Tu código es: " + cdonu)#eWEgc2UgbWUgYWNhYmFyb24gbGFzIGlkZWFzIGRlIG1lbnNhamVzIHJlYWxtZW50ZSwgbm8gbGEgaGFsbGFzPw==
        else:#Si quieres jugar valo hablame en discor pa
            print("Código incorrecto. Acceso denegado.")#UmV2aXNhIGxhIGztbmVhIDcgYm9udGlAIDpEIHlhIG1lIGhhcnRhc3Rl #uy pista pista quieres una esta por alginas de las lineas
    except:#YXF17SBubyBoYXkgbmFkYSwgbG9sIHEgbWFs
        print("AHGGGG ESTA MAL, EN ALGO, EN A-L-G-O, NO  PROCESP. Acceso denegado.")#dHJhY3kgbWNyYWR5IDEzIHBvaW50cyBpbiAzMyBzZWMgYWdhaW50cyBzYW4gYW50b25pbyBzcHVycyB3aXRoIGFuIGFtYXppbmcgY29tZWJhY2sgOTAlIGJhbGxrbndvbGVkZ2U=
#TXIgUm9ib3QgZXMgam95YWFhYWFhYSBCKQ0K
if __name__ == "__main__":#QVJSSUJBIExBUyBBR1VJTEFTIERFTCBBTUVSSUNBIChMRSBERUJPIEFMIENPUFBFTCk=
    main()#WTMweXRkZ25zUm5sMjM=
#Tm8gZXN0YSBhY2EgcGVybyB0ZSBkYXJlIHVuYSBwaXN0YSwgZXN0YSB5YSBwdWVzdGEgZW4gZWwgY29kaWdvIDow`,
    5: `codeblock.py
imort random
imp0rt os
import base64
preguntas = [
    {
        "pregunta": "v0N14WwgZXMgZWwgcu1vIG3hcyBsYXJnbyBkZWwgbXVuZG8/",
        "opciones": {
            "a": "Tmlsbw==",
            "b" "QW1hem9uYXM=",
            "c" "WWFuZ3Rz6Q==",
            "d": "TWlzaXNpcGk="
        },
        "respuesta_correcta": "b"
    {
        "pregunta" "v0VuIHF16SBh8W8gY29tZW568yBsYSBQcmltZXJhIEd1ZXJyYSBNdW5kaWFsPw==",
        "opciones": {
            "a": "MTkxMA==",
            "b": "MTkxMg==",
            "c": "MTkxNA==",
            "d": "MTkxNg=="
        },
        "respuesta_correcta": "c"
    }
    {
        "pregunta": "v0N14WwgZXMgZWwgZWxlbWVudG8gcXXtbWljbyBt4XMgYWJ1bmRhbnRlIGVuIGxhIFRpZXJyYT8=",
        "opciones": {
            "a": "T3jtZ2Vubw==",
            "b": "HSGllcnJvierro",
            "c": "U2lsaWNpbwo=",
            "d": "Q2FyYm9ubw=="
        },
        "respuesta_correcta": "a"
    },
    {
        "pregunta": "v1F1aeluIHBpbnTzICdMYSBub2NoZSBlc3RyZWxsYWRhJz8=",
        "opciones": {
            "a": "UGFibG8gUGljYXNzbw==",
            "b": "Q2xhdWRlIE1vbmV0",
            "c": "VmluY2VudCB2YW4gR29naA==",
            "d": "TGVvbmFyZG8gZGEgVmluY2k="
        },
        "respuesta_correcta": "c"
    },
    {
        "pregunta": "v0N14WwgZXMgZWwgcGxhbmV0YSBt4XMgZ3JhbmRlIGRlbCBzaXN0ZW1hIHNvbGFyPw==",
        "opciones":
            "a": "VGllcnJh",
            "b": "SvpwaXRlcg==",
            "c": "U2F0dXJubw==",
            "d": "TmVwdHVu"
        },
        "respuesta_correcta": "b"
    },
    {
        "pregunta": "v0N14WwgZXMgbGEgY2FwaXRhbCBkZSBBdXN0cmFsaWE/",
        "opciones": {
            "a": "U+1kbmV5",
            "b": "TWVsYm91cm5l",
            "c": "Q2FuYmVrcmE=",
            "d": "QnJpc2JhbmU="
        },
        "respuesta_correcta": "c"
    },
    {
        "pregunta": "v0VuIHF16SBh8W8gc2UgZnVuZPMgbGEgT05VPw==",
        "opciones": {
            "a": "MTk0NQ==",
            "b": "MTk1MA==",
            "c": "MTk1NQ==",
            "d": "MTk2MA=="
        ,
        "respuesta_correcta": "a"
    },
]
def lec():
    lec=open("respuestas.txt","r", encoding='utf8'
    linea=lec.readlines()
    print(linea[8])
def hacer_pregunta(pregunta_dict:
    """Muestra una pregunta y verifica la respuesta"""
    print("\n" + pregunta_dict["pregunta"])
    for opcion, texto in pregunta_dict["opciones"].items():
        print(f"{opcion}) {texto}")
    respuesta = input("\nTu respuesta (a, b, c, d): ").lower().strip()
    while respuesta not in ["a", "b", "c", "d"]:
        print("Por favor, ingresa una opción válida (a, b, c, d).")
        respuesta = input("Tu respuesta: ").lower().strip()
    if respuesta == pregunta_dict["respuesta_correcta"]
        print("¡Correcto!")
        return True
    else:
        print(f"Incorrecto. La respuesta correcta era: {pregunta_dict['respuesta_correcta']}")
        return False
def main():
    pint("\n" + "="*50)
    print("DESENCRIPTADOR DE MENSAJES CON QUIZ")
    prit("="*50)
    prit("\nPara desencriptar el mensaje, debes responder correctamente 5 preguntas de cultura general.")
    while True:
        preguntas_seleccionadas = random.sample(preguntas, 5)
        respuestas_correctas = #0
        for i, pregunta in enumerate(preguntas_seleccionadas, 1):
            print(f"\nPregunta {i} de 5:")
            if hacer_pregunta(pregunta):
                respuestas_correctas += 1
        print(f"\nHas respondido correctamente {respuestas_correctas} de 5 preguntas.")
        if respuestas_correctas == 5:
            print("\n¡Felicidades! Has respondido todas las preguntas correctamente.")
            print("\n El mensaje sifrado esssssss: \n")
            print("=============================================================================================================================================")
            lec(
            print("=============================================================================================================================================")
            print("ahora intenta encuentra el codigo para el siguiente nivel")
            break
        else:
            print("\nNo has respondido todas las preguntas correctamente. Debes volver a intentarlo.")
            continuar = input("\n¿Quieres intentarlo de nuevo? (s/n): ").lower().strip()
            if continuar != 's':
                print("\nGracias por participar. ¡Hasta pronto!")
                break
if __name__ == "__main__":
    main(`,
    6: `fernet='gAAAAABn9_xIn6HeWgpeESMWOdIUzikOGBnqGDESHCAmbFa5G3kDFQV1zfvMNrrQNI1W2n0scKqKJuqgqrs9_kUk4Ief5ie5pwJ7UwyaHwYgYAInI2WtWuJn2hOyHLD5KrTOnw8yG-RtR8CFkkOTCZPb5CQ71a-rvnYrCU8KNJ_GRi05_umpwcuJ0zhPpHjr4aX8eolgHsAdFBInjxB5M_DTp9J3gZoVdAadkefHhuBOQbtSBTYqlFFaPVVUkRndBWX_NlCG7EdxgYV3pEf9N4NYdQkAynixEmKtAU3jjh66OBtbe4yDIjRl9SjnWCCOVGUnjniLZG0V3bJK_R40YnEB77PlXfwjsWebiI8jIPjlCMUlYvwJ-Y-OJcSUnMMh4iv1Z0y7b_3EQz6Dcq-YW43unvv4dLbCouYYc8jvoDCtdffkcMIVZ7JEm0LhnrPTx4mwih0RpvVq7SIuDjcDDZ7c1uXvYjnnzpFqxIiB8WIAoz9fpM48gH4A8kZczspUwuBVqIL4GDaLrRc7LT-WPRXjPRCBkzrmc-fpD2kMtkkEFNRymmI5XdMiD6pF67xaW1fsCTJ-bjXLhpPKKDFzsG4Nx6T82NEcUJZD__-2d8toQ5pN3L2w70Udf9-lSohoFHp7J4O7oSoviCVmkjHEZLMJyHJOAjDCGkIQPu9eDq1gAbflo7YEn16aTWk6qAPCzpHTh-anFDJdbNaNsXaaP9ybVZsjoRwcWnGTGRJFEK4abYp37VruIrqxziSNH9Ag3NcOXVdwSIvBstp1fLYgbcAubK5zfYk7ZtAmVWXDCsXzBPtByazYwMoA60oN4dSn8_YrKZfq6kxifYK1_3D2CBcOzOqbBrE4hFgKXtDPPZT5nFZs0MtfigExJY2r1B1cfFU82aG2P18s408I2lFks0nJGHuECOi3r2pI02tSkwqzrIk50HIHrs1-wuJXPHaK_JSsa6kO-5seDjxxMI_wQffedHc4QTWsub7gEOW8XGFXGEg1p_OUUMu04s_Dw_IfiHszLqkUUyPY'
key='whatiswhatiswhatiswhatisisfernet'`
  };

  getFileContent(id: number): string {
    return this.files[id] || '';
  }
} 