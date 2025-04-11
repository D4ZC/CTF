codeblock.py
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
            "c": "Q2FuYmVycmE=",
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
    main(
        