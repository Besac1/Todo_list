//document.addEventListener("DOMContentLoaded", function () {
//});
/*jslint browser: true, node: true */
/*jslint browser: true, indent: 4 */

var liste = {

    newBillet: function (a, b) {

        "use strict";
        var li = document.createElement("LI"),
            Todo = document.getElementById('Todo'),
            form = document.createElement('FORM'),
            title = document.createElement('INPUT'),
            description = document.createElement('TEXTAREA'),
            that = this;

        title.setAttribute('type', 'text');
        title.setAttribute('placeholder', 'Titre');
        title.setAttribute('class', 'title');

        description.setAttribute('type', 'text');
        description.setAttribute('placeholder', 'Description');
        description.setAttribute('class', 'description');

        form.appendChild(title);
        form.appendChild(description);
        form.setAttribute('onsubmit', 'return false');

        li.appendChild(form);

        if (a && b) {

            title.value = a;
            description.value = b;

        }

        Todo.appendChild(li);

        form.addEventListener('keydown', function (e) {

            if (e.keyCode === 13) {

                that.submitBillet(this);

            }

        });

    },

    submitBillet: function (form) {

        var title = form[0].value,
            description = form[1].value,
            parentNode = form.parentElement,
            that = this;

        if ((description.trim()).length === 0 || (title.trim()).length === 0) {

            return false;

        } else {

            var h3 = document.createElement('H3'),
                p = document.createElement('P'),
                croix = document.createElement('SPAN'),
                crayon = document.createElement('SPAN'),
                titleNode = document.createTextNode(title),
                descriptionNode = document.createTextNode(description);

            parentNode.removeChild(form);

            crayon.setAttribute('class', 'crayon');
            croix.setAttribute('class', 'croix');

            h3.appendChild(titleNode);
            p.appendChild(descriptionNode);

            parentNode.appendChild(crayon);
            parentNode.appendChild(croix);
            parentNode.appendChild(h3);
            parentNode.appendChild(p);

            parentNode.setAttribute('draggable', 'true');
            parentNode.addEventListener('dragstart', function (e) {

                e.dataTransfer.setData('text/plain', "Passer le billet de To Do à Done");
                that.moveBillet(this);

            }, false);

            croix.addEventListener('click', function () {

                that.deleteBillet(this.parentElement);

            });

            crayon.addEventListener('click', function () {

                that.editBillet(this.parentElement);

            });

        }

    },

    deleteBillet: function (node) {

        var parentNode = node.parentElement;

        parentNode.removeChild(node);

    },

    editBillet: function (node) {

        var parentNode = node.parentElement,
            p = node.getElementsByTagName('P')[0].innerHTML,
            h3 = node.getElementsByTagName('H3')[0].innerHTML;

        parentNode.removeChild(node);

        this.newBillet(h3, p);

    },

    moveBillet: function (node) {

        var done = document.getElementById('Done');

        done.addEventListener('dragover', function (e) {

            e.preventDefault();

        });

        done.addEventListener('drop', function (e) {

            e.preventDefault();

            node.parentElement.removeChild(node);
            node.setAttribute('draggable', 'false');
            done.appendChild(node);
            if (node.getElementsByClassName('crayon')[0]) {

                node.removeChild(node.getElementsByClassName('crayon')[0]);

            }

        });

    }

};

/* ----------------- VAR LAND ----------------- */

var plus, example;

/* -------------------------------------------- */

/* --------------- SAC DE NOEUDS --------------- */

plus = document.getElementById('plus');
example = document.getElementsByClassName('example');

/* --------------------------------------------- */

/* ----------- ADDEVENTLISTENER LAND ----------- */

plus.addEventListener('click', function () {

    liste.newBillet();

});

example.item(0).addEventListener('click', function () {

    liste.deleteBillet(this.parentElement);

});

example.item(1).addEventListener('click', function () {

    liste.deleteBillet(this.parentElement);

});
/* --------------------------------------------- */