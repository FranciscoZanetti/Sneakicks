def convert_to_vw():
    unit=input("Unidad de medida original (px-rem): ")
    unit=unit.lower()
    while (unit!="rem") and (unit!="px"):
        unit=input("Error. Unidad de medida original (px-rem): \n")
        unit=unit.lower()
    value=float(input(f"Valor en {unit}: "))
    width=int(input("Width: "))
    if unit=="rem":
        result=value*16*100/width
        print(f"\n{result} vw\n")
    else:
        result=value*100/width
        print(f"\n{result} vw\n")

def convert_vw_to():
    value=float(input(f"Valor en vw: "))
    width=int(input("Width: "))
    unit=input("Unidad de medida deseada (px-rem): ")
    unit=unit.lower()
    while (unit!="rem") and (unit!="px"):
        unit=input("Error. Unidad de medida deseada (px-rem): ")
        unit=unit.lower()
    result=value*width/100
    if unit=="px":
        print(f"\n{result} px\n")
    else:
        print(f"\n{result/16} rem\n")

def resize():
    widthO=int(input("Width original: "))
    widthF=int(input("Width final: "))
    unitO=input("Unidad de medida original (px-rem): ")
    unitO=unitO.lower()
    while unitO!="px" and unitO!="rem":
        unitO=input("Error. Unidad de medida original (px-rem): ")
        unitO=unitO.lower()
    unitF=input("Unidad de medida final (px-rem): ")
    unitF=unitF.lower()
    while unitF!="px" and unitF!="rem":
        unitF=input("Error. Unidad de medida final (px-rem): ")
        unitF=unitF.lower()
    value=float(input(f"Valor en {unitO}: "))
    if unitO=="rem":
        value*=16
    if unitF=="rem":
        value/=16
    result=widthF*value/widthO
    print(f"\n{result} {unitF} para {widthF} width\n")


print("\nConvertir px/rem a vw = 1")
print("Convertir vw a px/rem = 2")
print("Escalar px/rem = 3")
n=int(input("Operacion a realizar (1-2-3) (Ingresar 0 para detener): "))
while (n!=1 and n!=2 and n!=3 and n!=0):
    n=int(input("Error. Operacion a realizar (1-2-3): "))
while n!=0:
    if n==1:
        convert_to_vw()
    if n==2:
        convert_vw_to()
    if n==3:
        resize()
    print("Convertir px/rem a vw = 1")
    print("Convertir vw a px/rem = 2")
    print("Escalar px/rem = 3")
    n=int(input("Operacion a realizar (1-2-3) (Ingresar 0 para detener): "))
    while (n!=1 and n!=2 and n!=3 and n!=0):
        n=int(input("Error. Operacion a realizar (1-2-3): "))