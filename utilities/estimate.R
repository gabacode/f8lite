library(ggplot2)
library(EpiEstim)

scopes <- c("bagheria","santaflavia","ficarazzi","casteldaccia","altavilla")
options(max.print=1235813)

#R you're lame.
`+` <- function(a, b) {
  if (is.character(a) | is.character(b)) {
    paste0(a, b)
  } else {
    base::`+`(a, b)
  }
}

for(scope in scopes){

#CARICAMENTO DATASET SETTIMANALE
bag <- read.csv('../public/datasets/'+scope+'/1w_'+scope+'.csv')
bag_d <- read.csv('../public/datasets/'+scope+'/1d_'+scope+'.csv')
bag_w <- bag[1:(dim(bag)[1]-1),]

#STIMA DI R
log <- data.frame(Data = bag_d$data, Freq = bag_d$nuovi_positivi)
log$Data <- as.Date(log$Data, "%Y-%m-%d")
df <- data.frame(I = c(log$Freq))

T<- nrow(df)
#Settimanale
w_start <- seq(2, T-6)
w_end <- w_start + 6
#Bisettimanale
bw_start <- seq(2, T-13)
bw_end <- bw_start + 13 

bag_R <- estimate_R(df, 
                    method = "parametric_si", 
                    config = make_config(list(
                      t_start = bw_start,
                      t_end = bw_end,
                      mean_si = 7.5,
                      std_si = 3.4))
                    )

bag_R_mean <- bag_R$R$`Mean(R)`

ER<-round(tail(bag_R_mean,1), digits = 2)
print("Stima R per "+scope+": "+ER)
}

#GRAFICO INCIDENZA SETTIMANALE
#ggplot(data = bag_w, aes(x = data, y = nuovi_positivi)) +
#  geom_bar(stat = "identity", fill = "#878dff") +
#  labs(title = "Incidenza settimanale COVID19 a "+scope,
#       subtitle = "Stima R: "+ER,
#       x = "Data", y = "Numero nuovi positivi")