library(ggplot2)
library(EpiEstim)

scopes <- c("bagheria","santa_flavia","ficarazzi","casteldaccia","altavilla_milicia")
options(max.print=1235813)

`+` <- function(a, b) {
  if (is.character(a) | is.character(b)) {
    paste0(a, b)
  } else {
    base::`+`(a, b)
  }
}

for(scope in scopes){

#CARICAMENTO DATASET
data_d <- read.csv('../public/datasets/1d_'+scope+'.csv')
comune <- toString(data_d$comune[1])

#STIMA DI R
log <- data.frame(Data = data_d$data, Freq = data_d$nuovi_positivi)
log$Data <- as.Date(log$Data, "%Y-%m-%d")
df <- data.frame(I = c(log$Freq))

T<- nrow(df)

#Settimanale
w_start <- seq(2, T-6)
w_end <- w_start + 6

#Bisettimanale
bw_start <- seq(2, T-13)
bw_end <- bw_start + 13 

data_R <- estimate_R(df, 
                    method = "parametric_si", 
                    config = make_config(list(
                      t_start = bw_start,
                      t_end = bw_end,
                      mean_si = 7.5,
                      std_si = 3.4))
                    )

data_R_mean <- data_R$R$`Mean(R)`

ER<-round(tail(data_R_mean,1), digits = 2)
print("Stima R per "+comune+": "+ER)
}
