library(ggplot2)
library(EpiEstim)

scope <- "BAGHERIA"
options(max.print=1235813)

#R you're lame.
`+` <- function(a, b) {
  if (is.character(a) | is.character(b)) {
    paste0(a, b)
  } else {
    base::`+`(a, b)
  }
}

#CARICAMENTO DATASET SETTIMANALE
bag <- read.csv('../public/datasets/1w.csv')
bag_w <- bag[1:(dim(bag)[1]-1),]

#STIMA DI R
log <- data.frame(Data = bag_w$time, Freq = bag_w$value)
log$Data <- as.Date(log$Data, "%Y-%m-%d")
df <- data.frame(I = c(log$Freq))

bag_R <- estimate_R(df, method = "parametric_si", config = make_config(list(mean_si = 7.5, std_si = 3.4)))
ER<-round(tail(bag_R$R$`Mean(R)`,1), digits = 2)
print("Stima R per "+scope+": "+ER)

#GRAFICO INCIDENZA SETTIMANALE
ggplot(data = bag_w, aes(x = time, y = value)) +
  geom_bar(stat = "identity", fill = "#878dff") +
  labs(title = "Incidenza settimanale al COVID19 a "+scope,
       subtitle = "Stima R: "+ER,
       x = "Data", y = "Numero nuovi positivi")
