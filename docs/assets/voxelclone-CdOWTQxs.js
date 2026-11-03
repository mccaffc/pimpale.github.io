import{o as e}from"./rolldown-runtime-BCiCTKAo.js";import"./modulepreload-polyfill-P2Xu9kJm.js";import{n as t,r as n,t as r}from"./client-DyL1ZotQ.js";import{t as i}from"./Section-CMotTF6f.js";import{t as a}from"./HrefLink-DD7POFgk.js";import{t as o}from"./ArticleLayout-Chegvux2.js";import{n as s,t as c}from"./a11y-dark-CVPsSXXh.js";import{t as l}from"./lib-module-n3OySL-K.js";import{r as u,t as d}from"./Articles-Dxw5nSDo.js";import{t as f}from"./bootstrap-sMF1ce4T.js";var p=e(n()),m=t(),h=e(r());f(),(0,h.createRoot)(document.getElementById(`root`)).render((0,m.jsx)(p.StrictMode,{children:(0,m.jsx)(()=>(0,m.jsx)(o,{children:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(i,{id:`voxelclone`,name:`Voxelclone`,children:[(0,m.jsx)(`p`,{children:`Very small stack based programming language.`}),(0,m.jsx)(`h4`,{children:`Motivation`}),(0,m.jsx)(`p`,{children:`I created Voxelclone mostly for fun, but also to try my hand at writing a very simple intepreter in C. The entire source code (at time of writing) is only 824 lines of C, and could easily be compressed further while maintaining readability.`}),(0,m.jsxs)(`p`,{children:[`The language is very similar to `,(0,m.jsx)(`a`,{href:`https://en.wikipedia.org/wiki/Forth_(programming_language)`,children:`Forth`}),`, which similarly uses a stack to store arguments for functions.`]}),(0,m.jsxs)(`p`,{children:[`It shares with `,(0,m.jsx)(`a`,{href:`https://en.wikipedia.org/wiki/Lisp_(programming_language)`,children:`Lisp`}),` the property of `,(0,m.jsx)(`a`,{href:`https://en.wikipedia.org/wiki/Homoiconicity`,children:`homoiconicity`}),`. This means that a program written in Voxelclone treats its own code as data. Lisp accomplishes this using lists, which means any Lisp code can be represented as a list. Voxelclone uses strings for this purpose.`]}),(0,m.jsx)(`p`,{children:`Voxelclone syntax uses code stored in strings heavily, for loops, if statements, and other control structures. The string syntax is somewhat inspired by Lisp, since we use parentheses instead of double quotes.`}),(0,m.jsx)(`h4`,{children:`Name/Logo Explanation`}),(0,m.jsx)(`p`,{children:`It's named Voxelclone due to its stack based nature. Just as a voxelclone has many delicious pasta layers, the executing program will also have layers of tasty strings and numbers.`}),(0,m.jsx)(`p`,{children:`The logo is remniscent of a famous cartoon cat who is notoriously fond of voxelclone.`})]}),(0,m.jsxs)(i,{id:`usage`,name:`How to Use`,children:[(0,m.jsx)(`h4`,{children:`Building the Interpreter`}),(0,m.jsxs)(`p`,{children:[`The source code is located here: `,(0,m.jsx)(a,{href:`https://github.com/pimpale/voxelclone`})]}),(0,m.jsxs)(`p`,{children:[`First, ensure that you have `,(0,m.jsx)(`a`,{href:`https://en.wikipedia.org/wiki/Clang`,children:`Clang`}),` installed, as well as `,(0,m.jsx)(`a`,{href:`https://en.wikipedia.org/wiki/Make_(software)`,children:`make`}),` and `,(0,m.jsx)(`a`,{href:`https://en.wikipedia.org/wiki/Find_(Unix)`,children:`find`}),`.`]}),(0,m.jsx)(`p`,{children:`Then, clone the repository, and from within the top level folder run:`}),(0,m.jsx)(s,{className:`mx-5`,showLineNumbers:!0,style:c,children:`make`}),(0,m.jsx)(`h4`,{children:`Running the Interpreter`}),(0,m.jsxs)(`p`,{children:[`After compilation, the interpreter binary will be located at `,(0,m.jsx)(`code`,{children:`obj/voxelclone`}),`.`]}),(0,m.jsx)(`p`,{children:`To get an interactive shell, run:`}),(0,m.jsx)(s,{className:`mx-5`,showLineNumbers:!0,style:c,children:`./obj/voxelclone`}),(0,m.jsx)(`p`,{children:`To execute a Voxelclone script, do:`}),(0,m.jsx)(s,{className:`mx-5`,showLineNumbers:!0,style:c,children:`./obj/voxelclone <FILENAME>`})]}),(0,m.jsxs)(i,{id:`guide`,name:`Language Guide`,children:[(0,m.jsx)(`p`,{children:`This language is based entirely on the stack and string. Some examples:`}),(0,m.jsx)(`h4`,{children:`hello world`}),(0,m.jsx)(s,{className:`mx-5`,showLineNumbers:!0,style:c,children:`(hello world) print`}),(0,m.jsxs)(`p`,{children:[`This prints hello world. Instead of the `,(0,m.jsx)(`code`,{children:`"`}),` character, `,(0,m.jsx)(`code`,{children:`(`}),` and `,(0,m.jsx)(`code`,{children:`)`}),` are used to represent strings, and can be nested. The string is pushed onto the stack character by character, with a leading and terminating null byte.`,(0,m.jsx)(`code`,{children:`printstr`}),` is one of a few built in functions defined in src/functions.c`]}),(0,m.jsx)(`h4`,{children:`Comments`}),(0,m.jsxs)(`p`,{children:[`Comments go from a `,(0,m.jsx)(`code`,{children:`#`}),` to the end of the line, and can be defined anywhere (even in a string). To include a literal `,(0,m.jsx)(`code`,{children:`#`}),` in the string, use a backslash.`]}),(0,m.jsx)(`p`,{className:`mb-4`,children:`Some examples of usage:`}),(0,m.jsx)(s,{className:`mx-5`,showLineNumbers:!0,style:c,children:l`
        (hello
        # This is a comment
        world) println
      `}),(0,m.jsx)(`p`,{children:`This code would print out:`}),(0,m.jsx)(s,{className:`mx-5`,showLineNumbers:!0,style:c,children:l`
        hello
        world
      `}),(0,m.jsx)(`p`,{children:`However, if we escape the hash, it would be:`}),(0,m.jsx)(s,{className:`mx-5`,showLineNumbers:!0,style:c,children:l`
        (hello
        \# This is a comment
        world) println
      `}),(0,m.jsx)(`p`,{children:`This results in`}),(0,m.jsx)(s,{className:`mx-5`,showLineNumbers:!0,style:c,children:l`
        hello
        # This is a comment
        world
      `}),(0,m.jsx)(`h4`,{children:`Math`}),(0,m.jsx)(`p`,{children:`For the most part, math is pretty self explanatory. Due to technical limitations, all numbers right now are unsigned 8 bit integers. Therefore, numeric literals must be positive integers less than 255.`}),(0,m.jsx)(`p`,{children:`Example:`}),(0,m.jsx)(s,{className:`mx-5`,showLineNumbers:!0,style:c,children:l`
        1 2 +u8 print8
      `}),(0,m.jsx)(`p`,{children:`Execution of the program is left to right. So, this program pushes the bytes 1 and 2, sums them, and prints the result.`}),(0,m.jsx)(`h4`,{children:`Eval`}),(0,m.jsxs)(`p`,{children:[`A very important function in Voxelclone is `,(0,m.jsx)(`code`,{children:`eval`}),`, since it's used as a building block for many other control statements. This function takes in a string stored on the stack, and evaluates it as Voxelclone source code.`]}),(0,m.jsx)(`p`,{children:`Let's look at a somewhat contrived example:`}),(0,m.jsx)(s,{className:`mx-5`,showLineNumbers:!0,style:c,children:l`
        ((one level deep) print) eval
      `}),(0,m.jsxs)(`p`,{children:[`Since parentheses can be nested, it's not a problem that we have strings inside other strings. What happens is that when the branch is evaluated, the inner string will be pushed onto the stack. In this example, we first see the string `,(0,m.jsx)(`code`,{children:`((one level deep) print)`}),` and push it onto the stack. We then reach the `,(0,m.jsx)(`code`,{children:`eval`}),` function, which pops the string off the stack and begins executing it as code. This causes `,(0,m.jsx)(`code`,{children:`one level deep`}),` to be pushed to the stack. We then execute the `,(0,m.jsx)(`code`,{children:`print`}),` function, which pops the string and prints it out.`]}),(0,m.jsx)(`p`,{children:`So, this fragment will output:`}),(0,m.jsx)(s,{className:`mx-5`,showLineNumbers:!0,style:c,children:l`
        one level deep
      `}),(0,m.jsx)(`h4`,{children:`If Statements`}),(0,m.jsx)(`p`,{children:`If statements are actually just a regular function, like everything else in voxelclone. In Voxelclone, like C, 0 is considered as false, and any other number is considered true.`}),(0,m.jsx)(`p`,{children:`The ifelse function takes 3 parameters, first a u8 number and two strings to be evaluated. The first string will be evaluated if the number is not equal to zero, and the second string will be evaluated if it was zero.`}),(0,m.jsx)(`p`,{children:`Let's take a look at an example:`}),(0,m.jsx)(s,{className:`mx-5`,showLineNumbers:!0,style:c,children:l`
        1

        ( # If
        (if the above condition is true, this will print) println
        )
        ( # Else
        (if not, this will) println
        )
        ifelse
      `}),(0,m.jsxs)(`p`,{children:[`First, the top value in the stack, `,(0,m.jsx)(`code`,{children:`1`}),` here, is pushed to the stack. Then we push the true branch and the false branch to the stack. When the ifelse function runs, all three of these are popped off the stack. Since the condition is 1, the first branch is evaluated. This pushes the string `,(0,m.jsx)(`code`,{children:`if the following condition is true, this will print`}),` to the stack and then prints it.`]}),(0,m.jsx)(`h4`,{children:`Defining a Function`}),(0,m.jsxs)(`p`,{children:[`In order to define a new function, you'll have to use the `,(0,m.jsx)(`code`,{children:`mkfun`}),` function.`]}),(0,m.jsx)(s,{className:`mx-5`,showLineNumbers:!0,style:c,children:l`
        ((hello) println) (say-hello) mkfun
      `}),(0,m.jsxs)(`p`,{children:[`Now, the word `,(0,m.jsx)(`code`,{children:`say-hello`}),` refers to a function name that we can use.`]}),(0,m.jsxs)(`p`,{children:[`The following example should print out `,(0,m.jsx)(`code`,{children:`hello world`}),`, if we run it after the above defintion:`]}),(0,m.jsx)(s,{className:`mx-5`,showLineNumbers:!0,style:c,children:l`
        say-hello
      `}),(0,m.jsx)(`h4`,{children:`Loops`}),(0,m.jsxs)(`p`,{children:[`To make a loop we use the `,(0,m.jsx)(`code`,{children:`loop`}),` function. Loops repeatedly evaluate the given string as long as the topmost value on the stack is not 0. They pop the value of the stack before executing the body.`]}),(0,m.jsx)(`p`,{children:`To print a word 10 times:`}),(0,m.jsx)(s,{className:`mx-5`,showLineNumbers:!0,style:c,children:l`
        10
        (
          (a word) println
          1 -u8
          dupu8
        ) loop
      `}),(0,m.jsxs)(`p`,{children:[`Note that we use the `,(0,m.jsx)(`code`,{children:`dupu8`}),` function to duplicate the topmost value on the stack before the end of the loop.`]}),(0,m.jsx)(`h4`,{children:`Fizzbuzz`}),(0,m.jsx)(`p`,{children:`Here's how to write the classic Fizzbuzz program in Voxelclone:`}),(0,m.jsx)(s,{className:`mx-5`,showLineNumbers:!0,style:c,children:l`
        100
        1 ( # loop
          # Although the loop counts down, we must count up
          dupu8
          100 -u8

          dupu8 3 %u8 0 ==u8 dupu8 5 %u8 0 ==u8 &&u8 #if
          (
            (fizz buzz) println
          )
          # Else
          (
            dupu8 3 %u8 0 ==u8 #if
            (
              (fizz) println
            )
            # Else
            (
              dupu8 5 %u8 0 ==u8 #if
              (
                (buzz) println
              ) () ifelse
            ) ifelse
          ) ifelse

          dropu8 # Drop the 100 - version
          1 -u8  # Subtract 1 from counter
          dupu8  # Make copy for loop to consume
        ) loop
      `})]}),(0,m.jsxs)(i,{id:`conclusion`,name:`Conclusion`,children:[(0,m.jsx)(`p`,{children:`While Voxelclone is a pretty simple language, it's also incredibly slow, and pretty much useless for production purposes. Nonetheless, it was very fun and educational to make. Here is a list of the things I learned while making the project:`}),(0,m.jsxs)(`ul`,{children:[(0,m.jsxs)(`li`,{children:[(0,m.jsxs)(`p`,{children:[`It's hard to make a language homoiconic as well as legible. Voxelclone is not a particularly legible language. The Forth style `,(0,m.jsx)(`a`,{href:`https://en.wikipedia.org/wiki/Reverse_Polish_notation`,children:`RPN`}),` syntax is not intuititve since most people are accustomed to reading equations with functions at the front. Voxelclone also has the disadvantage that math operations aren't infixed.`]}),(0,m.jsx)(`p`,{children:`I think Lisp actually does a fairly good job with this (definitely better than Voxelclone, since functions go at the front), but even it is not super friendly when it comes to math.`})]}),(0,m.jsxs)(`li`,{children:[`C is a very poor language for writing templated code. Take a look at this monstrosity:`,(0,m.jsx)(s,{className:`mx-5`,showLineNumbers:!0,language:`c`,style:c,children:l`
            /* Function that takes in two args returns one */
            #define DEFINE_ARG2_RET1_NATIVE_FUN(type, identifier, operation1) \\
              static void identifier##_##type(Vector *stack, Table *funtab) { \\
                UNUSED(funtab);                                               \\
                type arg1, arg2, ret1;                                        \\
                popVector(stack, &arg1, sizeof(arg1));                        \\
                popVector(stack, &arg2, sizeof(arg2));                        \\
                ret1 = operation1;                                            \\
                *((type *)pushVector(stack, sizeof(ret1))) = ret1;            \\
              }

            #define DEFINE_TYPE(type)                                                \\
              /* Define Math Functions */                                            \\
              DEFINE_ARG2_RET1_NATIVE_FUN(type, add, arg2 + arg1)                    \\
              DEFINE_ARG2_RET1_NATIVE_FUN(type, sub, arg2 - arg1)                    \\
              DEFINE_ARG2_RET1_NATIVE_FUN(type, mul, arg2 *arg1)                     \\
              DEFINE_ARG2_RET1_NATIVE_FUN(type, div, arg2 / arg1)                    \\
              DEFINE_ARG2_RET1_NATIVE_FUN(type, mod, arg2 % arg1)                    \\
              DEFINE_ARG2_RET1_NATIVE_FUN(type, or, arg2 || arg1)                    \\
              DEFINE_ARG2_RET1_NATIVE_FUN(type, and, arg2 &&arg1)                    \\
              DEFINE_ARG2_RET1_NATIVE_FUN(type, equ, arg2 == arg1)                   \\
              /* Define dup, drop, and swp */                                        \\
              static void dup_##type(Vector *stack, Table *funtab) {                 \\
                UNUSED(funtab);                                                      \\
                type arg1, ret1, ret2;                                               \\
                popVector(stack, &arg1, sizeof(arg1));                               \\
                ret1 = arg1;                                                         \\
                ret2 = arg1;                                                         \\
                *((type *)pushVector(stack, sizeof(ret1))) = ret1;                   \\
                *((type *)pushVector(stack, sizeof(ret2))) = ret2;                   \\
              }                                                                      \\
              static void drop_##type(Vector *stack, Table *funtab) {                \\
                UNUSED(funtab);                                                      \\
                type arg1;                                                           \\
                popVector(stack, &arg1, sizeof(arg1));                               \\
              }                                                                      \\
              static void swp_##type(Vector *stack, Table *funtab) {                 \\
                UNUSED(funtab);                                                      \\
                type arg1, arg2, ret1, ret2;                                         \\
                popVector(stack, &arg1, sizeof(arg1));                               \\
                popVector(stack, &arg2, sizeof(arg2));                               \\
                ret1 = arg1;                                                         \\
                ret2 = arg2;                                                         \\
                *((type *)pushVector(stack, sizeof(ret1))) = ret1;                   \\
                *((type *)pushVector(stack, sizeof(ret2))) = ret2;                   \\
              }

            #define NATIVE_FUNCTION_PUT(funName, stringLiteral)                     \\
              do {                                                                  \\
                char *string = stringLiteral;                                       \\
                Function f;                                                         \\
                initNativeFunction(&f, &(funName));                                 \\
                putTable(funtab, string, strlen(string) + 1, &f, sizeof(Function)); \\
              } while (0)

            #define PUT_TYPE(type, name)                        \\
              do {                                              \\
                NATIVE_FUNCTION_PUT(add_##type, "+" #name);     \\
                NATIVE_FUNCTION_PUT(sub_##type, "-" #name);     \\
                NATIVE_FUNCTION_PUT(mul_##type, "*" #name);     \\
                NATIVE_FUNCTION_PUT(div_##type, "/" #name);     \\
                NATIVE_FUNCTION_PUT(mod_##type, "%" #name);     \\
                NATIVE_FUNCTION_PUT(or_##type, "||" #name);     \\
                NATIVE_FUNCTION_PUT(and_##type, "&&" #name);    \\
                NATIVE_FUNCTION_PUT(equ_##type, "==" #name);    \\
                NATIVE_FUNCTION_PUT(dup_##type, "dup" #name);   \\
                NATIVE_FUNCTION_PUT(drop_##type, "drop" #name); \\
                NATIVE_FUNCTION_PUT(swp_##type, "swp" #name);   \\
              } while (0)

            DEFINE_TYPE(uint8_t)
            DEFINE_TYPE(uint64_t)

            void initPrelude(Table *funtab) {
              PUT_TYPE(uint8_t, u8);
              PUT_TYPE(uint64_t, u64);

              NATIVE_FUNCTION_PUT(mkfun, "mkfun");
              NATIVE_FUNCTION_PUT(delfun, "delfun");
              NATIVE_FUNCTION_PUT(eval, "eval");
              NATIVE_FUNCTION_PUT(ifelse, "ifelse");
              NATIVE_FUNCTION_PUT(loop, "loop");
              NATIVE_FUNCTION_PUT(print, "print");
              NATIVE_FUNCTION_PUT(println, "println");
              NATIVE_FUNCTION_PUT(dump, "dump");
            }
         `}),`C has a lot of other annoying problems as well, like pointer decay, it's pointer syntax, and the way macros work.`]})]}),(0,m.jsx)(`h4`,{children:`Next Steps`}),(0,m.jsx)(`p`,{children:`I think I'm pretty much finished with Voxelclone, and I don't intend on developing it further. However, if you find any bugs or have some suggestions, let me know.`}),(0,m.jsxs)(`p`,{children:[`Regarding programming language design, my attention has shifted to `,(0,m.jsx)(d,{a:u.get(`achernar`)}),`.`]})]})]})}),{})}));