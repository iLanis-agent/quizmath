import json, random
def dec(n, p=1):
    b = 10**p
    w, f = divmod(n, b)
    fs = str(f).zfill(p).rstrip("0")
    return str(w) + "." + fs if fs else str(w)
def pl(n, one, many): return f"{n}" + (one if n == 1 else many)
def rounds(q, p):
    k = -(-q//p)
    return f"The {pl(q,' question',' questions')} at {p} a round make {pl(k,' round',' rounds')}, the last round holding {q-(k-1)*p}."
def points(q, p, e, b):
    k = -(-q//p)
    return f"The {pl(q,' question',' questions')} at {pl(e,' point',' points')} each are worth {q*e} points, and {pl(k,' round',' rounds')} at {b} bonus add {k*b}, {q*e+k*b} in all."
def score(c, t):
    tenths = (2000*c + t)//(2*t)
    return f"{c} correct of {t} is {dec(tenths)}%."
def time_(q, s, p, b):
    k = -(-q//p); tot = q*s + (k-1)*b*60
    h, m, r = tot//3600, (tot%3600)//60, tot%60
    return f"The {pl(q,' question',' questions')} at {pl(s,' second',' seconds')} each with {pl(k-1,' break',' breaks')} of {pl(b,' minute',' minutes')} take {tot} seconds, {pl(h,' hour',' hours')} {pl(m,' minute',' minutes')} {pl(r,' second',' seconds')}."
random.seed(772)
R=random.randint
cases = [
 dict(fn="rounds", args=["38","8"], expect=rounds(38,8)),
 dict(fn="points", args=["38","8","2","3"], expect=points(38,8,2,3)),
 dict(fn="score", args=["23","38"], expect=score(23,38)),
 dict(fn="time", args=["38","45","8","10"], expect=time_(38,45,8,10)),
 dict(fn="rounds", args=["1","1"], expect=rounds(1,1)),
 dict(fn="rounds", args=["40","8"], expect=rounds(40,8)),
 dict(fn="points", args=["1","1","1","0"], expect=points(1,1,1,0)),
 dict(fn="score", args=["0","5"], expect=score(0,5)),
 dict(fn="score", args=["5","5"], expect=score(5,5)),
 dict(fn="score", args=["1","8"], expect=score(1,8)),
 dict(fn="time", args=["1","1","1","0"], expect=time_(1,1,1,0)),
]
for _ in range(20):
    q,p=R(1,1000),R(1,100); cases.append(dict(fn="rounds", args=[str(q),str(p)], expect=rounds(q,p)))
for _ in range(20):
    q,p,e,b=R(1,1000),R(1,100),R(1,100),R(0,100); cases.append(dict(fn="points", args=[str(q),str(p),str(e),str(b)], expect=points(q,p,e,b)))
for _ in range(25):
    t=R(1,100000); c=R(0,t); cases.append(dict(fn="score", args=[str(c),str(t)], expect=score(c,t)))
for _ in range(20):
    q,s,p,b=R(1,1000),R(1,3600),R(1,100),R(0,120); cases.append(dict(fn="time", args=[str(q),str(s),str(p),str(b)], expect=time_(q,s,p,b)))
errs=[["rounds",["0","8"]],["rounds",["1001","8"]],["rounds",["38","0"]],["rounds",["38","101"]],["rounds",["38.5","8"]],
 ["points",["38","8","0","3"]],["points",["38","8","101","3"]],["points",["38","8","2","101"]],["points",["38","8","2","-1"]],
 ["score",["23","0"]],["score",["23","100001"]],["score",["39","38"]],["score",["-1","38"]],["score",["2.5","38"]],
 ["time",["38","0","8","10"]],["time",["38","3601","8","10"]],["time",["38","45","8","121"]],["time",["0","45","8","10"]]]
json.dump(dict(cases=cases, errors=errs), open("expected.json","w"), indent=1)
print(len(cases),"cases,",len(errs),"errcases")
