def calculateDiscount(price,percent):
  newPrice=price-(price*(percent/100))
  return newPrice
price=int(input(""))
print(calculateDiscount(price,15))
print(calculateDiscount(price,20))
print(calculateDiscount(price,-20))
