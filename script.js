$(document).ready(function () {
  const canvas = $('#my-node');
  const body = $('body');
  let removeGrid = false;
  let gridColor = $('#grid-color');

  let currentColor = $('#colorPicker');
  let mouseDragged = false;
  let currentRow;
  let currentTool = "paintBrush";

  let oldFillColor;
  let modalError = $(".modal-error");

  let width = 8;
  let height = 8;

  let eight = $(".eight");
  let twelve = $(".twelve");
  let sixteen = $(".sixteen");
  let thirtytwo = $(".thirtytwo");
  
  makeGrid();

  canvas.on('mousedown', 'td', function (e) {
    e.preventDefault();
    mouseDragged = true;
  });

  body.on('mouseup', function () {
    mouseDragged = false;
  });

  body.on('click', '#paint-brush', function () {
    removeCurrentTool();
    currentTool = "paintBrush";
    $('#paint-brush').addClass('tool-selected');
  });

  body.on('click', '#paint-bucket', function () {
    removeCurrentTool();
    currentTool = "paintBucket";
    $('#paint-bucket').addClass('tool-selected');
  });

  body.on('click', '#eye-dropper', function () {
    removeCurrentTool();
    currentTool = "eyeDropper";
    $('#eye-dropper').addClass('tool-selected');
  });

  body.on('click', '#eraser', function () {
    removeCurrentTool();
    currentTool = "eraser";
    $('#eraser').addClass('tool-selected');
  });

  body.on('click', '#sample-grape', function () {
    currentColor.val("#B38CB4");
  });

  body.on('click', '#sample-brown', function () {
    currentColor.val("#B7918C");
  });

  body.on('click', '#sample-khaki', function () {
    currentColor.val("#C5A48A");
  });

  body.on('click', '#sample-burlywood', function () {
    currentColor.val("#DDC67B");
  });

  body.on('click', '#sample-sunny', function () {
    currentColor.val("#F8F272");
  });

  body.on('click', '#sample-discoball', function () {
    currentColor.val("#2EC0F9");
  });

  body.on('click', '#sample-bluejeans', function () {
    currentColor.val("#67AAF9");
  });

  body.on('click', '#sample-blueeyes', function () {
    currentColor.val("#9BBDF9");
  });

  body.on('click', '#sample-blue', function () {
    currentColor.val("#C4E0F9");
  });

  body.on('click', '#sample-mist', function () {
    currentColor.val("#E3DFFF");
  });

  body.on('click', '#sample-thistle', function () {
    currentColor.val("#D3C0CD");
  });

  body.on('click', '#sample-rose', function () {
    currentColor.val("#B95F89");
  });

  gridColor.change(function () {
    $('table').css('border-color', gridColor.val());
    $('tr').css('border-color', gridColor.val());
    $('td').css('border-color', gridColor.val());
  });

  body.on('click', '#remove-grid', function () {
    removeGrid = !removeGrid;
    if (removeGrid) {
      $('table').css('border', "none");
      $('tr').css('border', "none");
      $('td').css('border', "none");
    } else {
      $('table').css('border', "1px solid " + gridColor.val() + "");
      $('tr').css('border', "1px solid " + gridColor.val() + "");
      $('td').css('border', "1px solid " + gridColor.val() + "");
    }
  });

  canvas.on('mousemove', function (e) {
    if (mouseDragged) {
      let clickedCell = $(e.target).closest('td');
      if (currentTool === "paintBrush") {
        highlightSquares(clickedCell);
      } else if (currentTool === "eraser") {
        clickedCell.css('background-color', "white");
      }
    }
  });

  canvas.on('click', 'td', function (e) {
    let clickedCell = $(e.target).closest('td');
    switch (currentTool) {
      case "paintBrush":
        highlightSquares(clickedCell);
        break;
      case "paintBucket":
        oldFillColor = clickedCell.css("background-color");
        paintBucket(clickedCell);
        break;
      case "eyeDropper":
        removeCurrentTool();
        eyeDropper(clickedCell);
        currentTool = "paintBrush";
        $('#paint-brush').addClass('tool-selected');
        break;
      case "eraser":
        clickedCell.css('background-color', "white");
        break;
    }
  });

  function makeGrid() {
    canvas.empty();
    for (let row = 0; row < height; row++) {
      canvas.append($('<tr />').attr('data-row', row));
      currentRow = canvas.children().last();
      for (let col = 0; col < width; col++) {
        currentRow.append($('<td bgcolor="white"></td>').attr('data-col', col));
      }
    }
  }

  $("#reset-grid").on("click", function () {
    canvas.empty();
    makeGrid();
  });

  function highlightSquares(clickedCell) {
    clickedCell.css('background-color', currentColor.val());
  }

  function paintBucket(chosenCell) {
    highlightSquares(chosenCell);
    let colNum = chosenCell.data('col');
    let rowNum = chosenCell.parent().data('row');
    if (colNum > 0) {
      let leftCell = chosenCell.prev();
      if (leftCell.css('background-color') == oldFillColor) {
        paintBucket(leftCell);
      }
    }
    if (colNum < width) {
      let rightCell = chosenCell.next();
      if (rightCell.css('background-color') == oldFillColor) {
        paintBucket(rightCell);
      }
    }
    if (rowNum > 0) {
      let topCell = chosenCell.parent().prev().children().eq(colNum);
      if (topCell.css('background-color') == oldFillColor) {
        paintBucket(topCell);
      }
    }
    if (rowNum < height) {
      let bottomCell = chosenCell.parent().next().children().eq(colNum);
      if (bottomCell.css('background-color') == oldFillColor) {
        paintBucket(bottomCell);
      }
    }
  }

  function removeCurrentTool() {
    $('img').removeClass('tool-selected');
  }

  function eyeDropper(clickedCell) {
    let tempColor = clickedCell.css('background-color');
    currentColor.val(rgbToHex(tempColor));
  }

  function rgbToHex(rgb) {
    var a = rgb.split("(")[1].split(")")[0].split(",");
    return "#" + a.map(function (x) {
      x = parseInt(x).toString(16);
      return (x.length == 1) ? "0" + x : x;
    }).join("");
  }

  eight.on("click", function () {
    height = 8;
    width = 8;
    makeGrid();
  });

  twelve.on("click", function () {
    height = 12;
    width = 12;
    makeGrid();
  });
  sixteen.on("click", function () {
    height = 16;
    width = 16;
    makeGrid();
  });


  thirtytwo.on("click", function () {
    height = 32;
    width = 32;
    makeGrid();
  });

  $('.foo').click(function () {
    // if (canvas.children().length > 0) {
    html2canvas($('#my-node'), {
      onrendered: function (canvas) {
        var a = document.createElement('a');
        a.href = canvas.toDataURL("image/png");
        a.download = 'image.png';
        a.click();
      }
    });
    // modalError.addClass("hidden");
    // } else
    // modalError.removeClass("hidden");
  });


  $('.secondFoo').click(function () {
    // if (canvas.children().length > 0) {
    html2canvas($('#my-node'), {
      onrendered: function (canvas) {
        var a = document.createElement('a');
        a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
        a.download = 'image.jpg';
        a.click();
      }
    });
    //   modalError.addClass("hidden");
    // } else
    //   modalError.removeClass("hidden");

  });

  $('.thirdFoo').click(function () {
    // if (canvas.children().length > 0) {
    html2canvas($('#my-node'), {
      onrendered: function (canvas) {
        var a = document.createElement('a');
        a.href = canvas.toDataURL("image/gif").replace("image/gif", "image/octet-stream");
        a.download = 'image.gif';
        a.click();
      }
    });
    //   modalError.addClass("hidden");
    // } else
    //   modalError.removeClass("hidden");
  });

  $('.modal-cancel').click(function () {
    modalError.fadeOut(500);
  });

  // function infoLog(width, height) {
  //   $('#dimension').text("grid size");
  //   $('#cell-x').text("W : " + width + " px");
  //   $('#cell-y').text("H : " + height + " px");
  //   $('#position').text("position");
  // }
  // canvas.on('mouseover', pixel, function positionLog(posx, posy) {
  //    posx = canvas.data('col');
  //    posy = canvas.data('row');
  //   $('#pos-x').text("X : " + posx + " px");
  //   $('#pos-y').text("Y : " + posy + " px");
  // });
});