﻿namespace ML
{
    public class Result
    {
        public bool Correct { get; set; }
        public string Message { get; set; }
        public object Object { get; set; }
        public List<Object> Objects { get; set; }
        public Exception Ex { get; set; }

       

    }
}